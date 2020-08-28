import os
from flask import current_app
from qiime2 import Artifact
from AXIOME3_app.utils import responseIfError
from AXIOME3_app.datahandle.luigi_prep_helper import (
	make_dir,
	copy_file,
	save_uploaded_file
)

def analysis_precheck(_id, feature_table, rep_seqs, metadata, classifier=None):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- feature_table: QIIME2 artifact of type FeatureTable[Frequency]
		- rep_seqs: QIIME2 artifact of type FeatureData[Sequence]
	"""
	feature_table_path = save_uploaded_file(_id, feature_table)
	rep_seqs_path = save_uploaded_file(_id, rep_seqs)
	metadata_path = save_uploaded_file(_id, metadata)
	# default classifier path
	default_classifier_path = current_app.config["DEFAULT_CLASSIFIER_PATH"]
	classifier_path = save_uploaded_file(_id, classifier) if classifier is not None else default_classifier_path

	def validate_analysis_input(feature_table, rep_seqs):
		"""
		Precheck input files prior to running denoise step

		Input:
			- feature_table: Path to QIIME2 artifact of type FeatureTable[Frequency]
			- rep_seqs: Path to QIIME2 artifact of type FeatureData[Sequence]
		"""
		# Check Artifact type
		try:
			feature_table_artifact = Artifact.load(feature_table)
			rep_seqs_artifact = Artifact.load(rep_seqs)

			if(str(feature_table_artifact.type) != "FeatureTable[Frequency]"):
				msg = "Input Feature Table is not of type 'FeatureTable[Frequency]'!"
				raise ValueError(msg)

			if(str(rep_seqs_artifact.type) != "FeatureData[Sequence]"):
				msg = "Input Representative Sequences is not of type 'FeatureData[Sequence]'!"
				raise ValueError(msg)

		except ValueError as err:
			message = str(err)

			return 400, message

		return 200, "Imported data good!"
	
	responseIfError(validate_analysis_input, feature_table=feature_table_path, rep_seqs=rep_seqs_path)

	return feature_table_path, rep_seqs_path, metadata_path, classifier_path

def analysis_setup(_id, feature_table, rep_seqs):
	destination_dir = os.path.join('/output', _id, 'dada2', 'merged')
	feature_table_destination = os.path.join(destination_dir, "merged_table.qza")
	rep_seqs_destination = os.path.join(destination_dir, "merged_rep_seqs.qza")

	responseIfError(make_dir, dirpath=destination_dir)
	responseIfError(copy_file, source=feature_table, destination=feature_table_destination)
	responseIfError(copy_file, source=rep_seqs, destination=rep_seqs_destination)