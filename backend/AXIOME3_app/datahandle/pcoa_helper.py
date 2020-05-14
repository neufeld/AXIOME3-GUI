"""
Handles all module extension related requests (e.g. PCoA, triplot)
"""
from qiime2.metadata.io import MetadataFileError

# Flask backend util functions
from AXIOME3_app import utils
from AXIOME3_app.datahandle.luigi_prep_helper import (
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
		try:
			metadata_df = load_metadata(metadata)
		except MetadataFileError as err:
			message = str(err)

			return 400, message

		try:
			check_column_exists(metadata_df, target_primary, target_secondary)

		except ValueError as err:
			message = str(err)

			return 400, message

		return 200, "Ok"

	utils.responseIfError(validate_metadata, metadata=metadata_path, target_primary=target_primary, target_secondary=target_secondary)