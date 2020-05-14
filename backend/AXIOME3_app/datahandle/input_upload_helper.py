import os
import pandas as pd
# QIIME2 modules
from qiime2.core.exceptions import ValidationError
from q2_types.per_sample_sequences import (
	SingleEndFastqManifestPhred33,
	SingleEndFastqManifestPhred33V2,
	SingleEndFastqManifestPhred64,
	SingleEndFastqManifestPhred64V2,
	PairedEndFastqManifestPhred33,
	PairedEndFastqManifestPhred33V2,
	PairedEndFastqManifestPhred64,
	PairedEndFastqManifestPhred64V2
)
from werkzeug.datastructures import FileStorage
from AXIOME3_app.datahandle.luigi_prep_helper import (
	make_dir,
	save_filestorage
)
from AXIOME3_app.utils import responseIfError

def input_upload_precheck(_id, uploaded_manifest, input_format):
	"""
	Do pre-checks as to decrease the chance of job failing.

	Input:
		- id: UUID4 in string representation.
		- request: request object

	Returns:
		- path to modified manifest file if valid input
	"""
	# Save uploaded manifest file in the docker container
	if(isinstance(uploaded_manifest, FileStorage)):
		manifest_path = responseIfError(save_filestorage, _id=_id, _file=uploaded_manifest)
	else:
		manifest_path = uploaded_manifest
		base_input_dir = "/input"
		input_dir = os.path.join(base_input_dir, _id)

		responseIfError(make_dir, dirpath=input_dir)

	def validate_manifest(manifest_path, input_format):
		"""
		Validate user supplied manifest file using QIIME2 modules.
		"""

		try:
			if(input_format == "SingleEndFastqManifestPhred33"):
				SingleEndFastqManifestPhred33(manifest_path, mode='r').validate()
			elif(input_format == "SingleEndFastqManifestPhred33V2"):
				SingleEndFastqManifestPhred33V2(manifest_path, mode='r').validate()
			elif(input_format == "SingleEndFastqManifestPhred64"):
				SingleEndFastqManifestPhred64(manifest_path, mode='r').validate()
			elif(input_format == "SingleEndFastqManifestPhred64V2"):
				SingleEndFastqManifestPhred64V2(manifest_path, mode='r').validate()
			elif(input_format == "PairedEndFastqManifestPhred33"):
				PairedEndFastqManifestPhred33(manifest_path, mode='r').validate()
			elif(input_format == "PairedEndFastqManifestPhred33V2"):
				PairedEndFastqManifestPhred33V2(manifest_path, mode='r').validate()
			elif(input_format == "PairedEndFastqManifestPhred64"):
				PairedEndFastqManifestPhred64(manifest_path, mode='r').validate()
			elif(input_format == "PairedEndFastqManifestPhred64V2"):
				PairedEndFastqManifestPhred64V2(manifest_path, mode='r').validate()
			else:
				invalid_format_msg = \
					"Specified input format, {input_format}, is not compatible with QIIME2..."\
					.format(input_format=input_format)

				raise ValueError(invalid_format_msg)

		except ValidationError as err:
			message = str(err)

			return 400, message

		except ValueError as err:
			message = str(err)

			return 400, message


		return 200, "Manifest good!"

	new_manifest_path = responseIfError(reformat_manifest, _id=_id, _file=manifest_path)
	responseIfError(validate_manifest, manifest_path=new_manifest_path, input_format=input_format)

	return new_manifest_path

def reformat_manifest(_id, _file):
	"""
	Check the followings:
		1. Specified FASTQ actually exists
		2. Rename paths to be compatible with docker
	"""
	# Two cases: V1 and V2 (im using V1 format by default)
	# TODO: different cases for different formats

	df = pd.read_csv(_file)

	# Seems header names are fixed for QIIME2 manifest file
	df["absolute-filepath"] = "/hostfs" + df["absolute-filepath"]

	# Save file
	base_input_dir = "/input"
	input_dir = os.path.join(base_input_dir, _id)

	new_manifest_name = "new_" + os.path.basename(_file)
	new_manifest_path = os.path.join(input_dir, new_manifest_name)
	df.to_csv(new_manifest_path, index=False)

	return 200, new_manifest_path