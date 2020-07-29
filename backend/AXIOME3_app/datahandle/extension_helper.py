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
from scripts.qiime2_helper.metadata_helper import (
	load_metadata,
	check_column_exists
)
from scripts.qiime2_helper.artifact_helper import (
	check_artifact_type
)
from exceptions.exception import AXIOME3Error as AXIOME3PipelineError

def validate_pcoa_input(_id, pcoa_artifact_path, metadata_path, target_primary, target_secondary=None):
	metadata_uploaded_path = save_uploaded_file(_id, metadata_path)
	# Save QIIME2 PCoA artiffact
	pcoa_uploaded_path = save_uploaded_file(_id, pcoa_artifact_path)

	def validate_metadata(metadata_path, target_primary, target_secondary):
		# Load metadata via QIIME2 metadata API
		# It will verify metadata vadlity as well
		try:
			metadata_df = load_metadata(metadata_path)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		# Check user-specified columns actually exist in the metadata file
		try:
			check_column_exists(metadata_df, target_primary, target_secondary)

		except AXIOME3PipelineError as err:
			message = str(err)

			return 400, message

		return 200, "Ok"

	def validate_artifact(pcoa_artifact_path):
		try:
			check_artifact_type(pcoa_artifact_path, "pcoa")
		except AXIOME3PipelineError as err:
			message = str(err)

			return 400, message

		return 200, "OK"

	responseIfError(validate_metadata, metadata_path=metadata_uploaded_path, target_primary=target_primary, target_secondary=target_secondary)
	responseIfError(validate_artifact, pcoa_artifact_path=pcoa_uploaded_path)

	return pcoa_uploaded_path, metadata_uploaded_path

def validate_bubbleplot_input(_id, feature_table_artifact_path, taxonomy_artifact_path, metadata_path=None, fill_variable=None):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- feature_table_artifact_path: feature table in QIIME2 artifact format (either path or FileStorage object)
		- taxonomy_artifact_path: taxonomy in QIIME2 artifact format (either path or FileStorage object)
	"""
	# Save uploaded file in the docker container
	feature_table_uploaded_path = save_uploaded_file(_id, feature_table_artifact_path)
	taxonomy_uploaded_path = save_uploaded_file(_id, taxonomy_artifact_path)
	if(metadata_path is not None):
		metadata_uploaded_path = save_uploaded_file(_id, metadata_path)
	else:
		metadata_uploaded_path = None

	def validate_artifact(feature_table_uploaded_path, taxonomy_uploaded_path):
		# Check Artifact type
		try:
			check_artifact_type(feature_table_uploaded_path, "feature_table")
			check_artifact_type(taxonomy_uploaded_path, "taxonomy")

		except AXIOME3PipelineError as err:
			message = str(err)

			return 400, message

		return 200, "Imported data good!"

	def validate_metadata(metadata_uploaded_path, fill_variable):
		# Load metadata via QIIME2 metadata API
		# It will verify metadata vadlity as well
		try:
			metadata_df = load_metadata(metadata_uploaded_path)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		# Check user-specified columns actually exist in the metadata file
		if(fill_variable is not None):
			try:
				check_column_exists(metadata_df, fill_variable)

			except AXIOME3PipelineError as err:
				message = str(err)

				return 400, message

		return 200, "Ok"

	responseIfError(validate_artifact, feature_table_uploaded_path=feature_table_uploaded_path, taxonomy_uploaded_path=taxonomy_uploaded_path)
	if(metadata_uploaded_path is not None):
		responseIfError(validate_metadata, metadata_uploaded_path=metadata_uploaded_path, fill_variable=fill_variable)

	return feature_table_uploaded_path, taxonomy_uploaded_path, metadata_uploaded_path

def validate_triplot_input(_id, feature_table_artifact_path, taxonomy_artifact_path, metadata_path, environmental_metadata_path, fill_variable):
	# Save uploaded file in the docker container
	feature_table_uploaded_path = save_uploaded_file(_id, feature_table_artifact_path)
	taxonomy_uploaded_path = save_uploaded_file(_id, taxonomy_artifact_path)
	metadata_uploaded_path = save_uploaded_file(_id, metadata_path)
	environmental_metadata_uploaded_path = save_uploaded_file(_id, environmental_metadata_path)

	def validate_metadata(metadata_path, environmental_metadata_path):
		# Load metadata via QIIME2 metadata API
		# It will verify metadata vadlity as well
		try:
			metadata_df = load_metadata(metadata_path)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		try:
			environmental_metadata_df = load_metadata(environmental_metadata_path)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		# Check user-specified columns actually exist in the metadata file
		try:
			check_column_exists(metadata_df, fill_variable)
		
		except AXIOME3PipelineError as err:
			message = str(err)
		
			return 400, message
		
		return 200, "Ok"

	def validate_artifact(feature_table_uploaded_path, taxonomy_uploaded_path):
		# Check Artifact type
		try:
			check_artifact_type(feature_table_uploaded_path, "feature_table")
			check_artifact_type(taxonomy_uploaded_path, "taxonomy")

		except AXIOME3PipelineError as err:
			message = str(err)

			return 400, message

		return 200, "Imported data good!"

	responseIfError(validate_metadata, metadata_path=metadata_uploaded_path, environmental_metadata_path=environmental_metadata_uploaded_path)
	responseIfError(validate_artifact, feature_table_uploaded_path=feature_table_uploaded_path, taxonomy_uploaded_path=taxonomy_uploaded_path)

	return feature_table_uploaded_path, taxonomy_uploaded_path, metadata_uploaded_path, environmental_metadata_uploaded_path

def pcoa_setup(_id):
	# Make output directory
	responseIfError(make_output_dir, _id=_id)

def bubbleplot_setup(_id):
	# Make output directory
	responseIfError(make_output_dir, _id=_id)

def triplot_setup(_id):
	# Make output directory
	responseIfError(make_output_dir, _id=_id)