"""
Handles all module extension related requests (e.g. PCoA, triplot)
"""
import os
from qiime2 import Artifact
from qiime2.metadata.io import MetadataFileError

# Flask backend util functions
from AXIOME3_app.utils import responseIfError
from AXIOME3_app.datahandle.luigi_prep_helper import (
	make_output_dir,
	save_uploaded_file
)

# Import from AXIOME3 pipeline
# Note PYTHONPATH is added in docker-compose.yml to enable searching in pipeline directory
from scripts.qiime2_helper.generate_pcoa import (
	load_metadata,
	check_column_exists
)

def validate_pcoa_input(_id, metadata, target_primary, target_secondary=None):
	metadata_path = save_uploaded_file(_id, metadata)

	def validate_metadata(metadata, target_primary, target_secondary):
		# Load metadata via QIIME2 metadata API
		# It will verify metadata vadlity as well
		try:
			metadata_df = load_metadata(metadata)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		# Check user-specified columns actually exist in the metadata file
		try:
			check_column_exists(metadata_df, target_primary, target_secondary)

		except ValueError as err:
			message = str(err)

			return 400, message

		return 200, "Ok"

	responseIfError(validate_metadata, metadata=metadata_path, target_primary=target_primary, target_secondary=target_secondary)

	return metadata_path

def pcoa_setup(_id, pcoa):
	# Save QIIME2 PCoA artiffact
	pcoa_path = save_uploaded_file(_id, pcoa)

	# Make output directory
	responseIfError(make_output_dir, _id=_id)

	return pcoa_path

def validate_bubbleplot_input(_id, feature_table_artifact_path, taxonomy_artifact_path):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- feature_table_artifact_path: feature table in QIIME2 artifact format
		- taxonomy_artifact_path: taxonomy in QIIME2 artifact format
	"""
	# Save uploaded file in the docker container
	feature_table_uploaded_path = save_uploaded_file(_id, feature_table_artifact_path)
	taxonomy_uploaded_path = save_uploaded_file(_id, taxonomy_artifact_path)

	def validate_artifact(feature_table_uploaded_path, taxonomy_uploaded_path):
		# Check Artifact type
		try:
			feature_table_artifact = Artifact.load(feature_table_uploaded_path)
			taxonomy_artifact = Artifact.load(taxonomy_uploaded_path)
			if(str(feature_table_artifact.type) != "FeatureTable[Frequency]"):
				msg = "Input QIIME2 Artifact is not of type 'FeatureTable[Frequency]'!"
				raise ValueError(msg)

			if(str(taxonomy_artifact.type) != "FeatureData[Taxonomy]"):
				msg = "Input QIIME2 Artifact is not of type 'FeatureData[Taxonomy]'!"
				raise ValueError(msg)

		except ValueError as err:
			message = str(err)

			return 400, message

		return 200, "Imported data good!"

	responseIfError(validate_artifact, feature_table_uploaded_path=feature_table_uploaded_path, taxonomy_uploaded_path=taxonomy_uploaded_path)

	return feature_table_uploaded_path, taxonomy_uploaded_path

def bubbleplot_setup(_id):
	# Make output directory
	responseIfError(make_output_dir, _id=_id)