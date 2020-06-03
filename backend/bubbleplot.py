import pandas as pd
import numpy as np
import re
from plotnine import *

# Assumes ASV table has features (taxas) as rows and samples as columns
# Should work on all AXIOM3 ASV tables (regular + taxa collapsed)
# same headers? 
# Two file parsers? (one for regular and one for collapsed)
def read_combined_table(combined_table_path):
	asv_df = pd.read_csv(
		combined_table_path,
		sep="\t",
		header=0,
		comment="#"
	)

	return asv_df

def filter_asv(asv_df):
	cols_to_drop = ["rowID", "Feature ID", "Consensus.Lineage", "ReprSequence"]
	filtered_df = asv_df.drop(cols_to_drop, axis="columns")

	return filtered_df	

def rename_taxa(taxa, row_id):
	"""
	Clean up SILVA taxonomic names

	Input:
	- taxa: list of SILVA taxa names (pd.Series)
	- row_id: row ID (pd.Series)
	"""
	taxa_with_id = taxa.astype(str) + "_" + row_id.astype(str)

	new_taxa = [re.sub(r";\s*Ambiguous_taxa", "", t) for t in taxa_with_id]
	new_taxa = [re.sub(r"(;\s*D_[2-6]__uncultured[^;_0-9]*)", "", t) for t in new_taxa]
	new_taxa = [re.sub(r"\s*D_[0-6]__", "", t) for t in new_taxa]

	# get the last entry
	new_taxa = [re.sub(r".*;", "", t) for t in new_taxa]

	return new_taxa

def calculate_percent_value(df, axis=0):
	"""
	Calculates % value per row or column. (value / (row) column sum).
	Column by default

	Input:
		asv_df: pandas dataframe. Read from AXIOME3 ASV table (.tsv).
			Should have ASV features as rows and Samples and metadata as
			columns.
			df: pandas dataframe.
	"""

	def percent_value_operation(x):
		"""
		Custom function to be applied on pandas dataframe.

		Input:
				x: pandas series; numerical data
		"""
		series_length = x.size
		series_sum = x.sum()

		# percent value should be zero if sum is 0
		all_zeros = np.zeros(series_length)
		percent_values = x / series_sum if series_sum != 0 else pd.Series(all_zeros)

		return percent_values

	# Calculate % value
	percent_val_df = df.apply(lambda x: percent_value_operation(x), axis=axis)

	return percent_val_df

def filter_by_keyword(taxa, keyword=None):
	"""
	Filter df by user specified keywordw

	Input:
		- taxa: original taxa name (pd.Series)
		- keyword: keyword string to search

	Returns:
		- boolean; True if match, False otherwise (pd.Series)
	"""
	# If keyword not specified, return all True
	if(keyword is None):
		default = pd.Series([True for i in range(0, taxa.shape[0])])
		default.index = taxa.index

		return default

	match = taxa.str.contains(str(keyword), case=False, regex=False)

	# Raise ValueError if 0 match?
	if(match.any() == False):
		message = "Specified search term, {term}, is NOT found in any entries".format(term=keyword)

		raise ValueError(message)

	return match

def filter_by_abundance(df, abundance_col, cutoff=0.2):
	"""
	Filter dataframe by a specified column by abundance
	"""
	if(abundance_col not in df.columns):
		raise ValueError("Column {col} does not exist in the dataframe".format(col=abundance_col))

	filtered_df = df[df[abundance_col] >= cutoff]

	if(filtered_df.shape[0] == 0):
		raise ValueError("No entries left with {cutoff} abundance threshold".format(cutoff=cutoff))

	return filtered_df

def round_percentage(df, abundance_col, num_decimal=3):
	if(abundance_col not in df.columns):
		raise ValueError("Column {col} does not exist in the dataframe".format(col=abundance_col))

	df[abundance_col] = df[abundance_col].round(num_decimal)

	return df

def alphabetical_sort_df(df, col):
	"""
	Alphabetically sort dataframe by a given column 
	"""
	if(col not in df.columns):
		raise ValueError("Column {col} does not exist in the dataframe".format(col=col))

	sorted_df = df.sort_values(by=[col])

	return sorted_df

def combined_asv_table_setup(asv_table_path):	
	asv_df = read_combined_table(asv_table_path)

	original_taxa = asv_df["Consensus.Lineage"]
	row_id = asv_df["rowID"]
	renamed_taxa = rename_taxa(original_taxa, row_id)

	cleanedup_df = filter_asv(asv_df)
	percent_df = calculate_percent_value(cleanedup_df)
	percent_df["SpeciesName"] = renamed_taxa

	filter_criteria = filter_by_keyword(original_taxa)
	filtered_df = percent_df.loc[filter_criteria, ]

	long_df = pd.melt(filtered_df, id_vars=['SpeciesName'], var_name="SampleName", value_name="Percentage")

	abundance_filtered_df = filter_by_abundance(long_df, "Percentage", 0.1)
	rounded_abundance_filtered_df = round_percentage(abundance_filtered_df, "Percentage", 3)
	sorted_df = alphabetical_sort_df(rounded_abundance_filtered_df, "SpeciesName")

	return sorted_df

def bubbleplot(df):
	ggplot_obj = ggplot(
									df,
									aes(
										x="SampleName",
										y="SpeciesName",
										fill="SampleName",
										size="Percentage"
									)
								)

	point = geom_point(shape='o', alpha=0.5)
	text = geom_text(aes(label="Percentage"), colour="black", size=3)
	scale_size = scale_size_area(max_size=15)
	y_label = ylab("Taxonomic affiliation")
	main_theme = theme_bw()
	theme_styles = theme(
									axis_text=element_text(size=8, colour='black'),
									text=element_text(size=8),
									axis_text_x=element_text(angle=90),
									plot_title=element_text(hjust=0.5),
									legend_position="none"
									)
	plot_theme = main_theme + theme_styles

	bubble_plot = ggplot_obj + point + text + scale_size + y_label + theme_styles

	return bubble_plot

def save_plot(plot, filename="plot.pdf", output_dir='.',
	width=100, height=90, units='mm'):

	# Plot size
	pdf_width_mm = width
	pdf_height_mm = height

	plot.save(
		filename=filename,
		path=output_dir,
		width=pdf_width_mm,
		height=pdf_height_mm,
		units=units
	)


#asv_table_path = "/home/danielm710/test/ASV_table_combined.tsv"
asv_table_path = "/data/output/exported/ASV_table_combined.tsv"
df = combined_asv_table_setup(asv_table_path)
plot = bubbleplot(df)
save_plot(plot)