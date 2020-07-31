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

def input_upload_precheck(_id, uploaded_manifest, input_format, is_multiple="no"):
	"""
	Do pre-checks as to decrease the chance of job failing.

	Input:
		- id: UUID4 in string representation.
		- uploaded_manifest: Either filestorage object or file path

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

	new_manifest_path = responseIfError(reformat_manifest_with_run_id, _id=_id, _file=manifest_path, input_format=input_format, is_multiple=is_multiple)

	if(is_multiple.lower() == "no"):
		responseIfError(validate_manifest, manifest_path=new_manifest_path, input_format=input_format)

	return new_manifest_path

def reformat_manifest_with_run_id(_id, _file, input_format, is_multiple):
	"""
	Check the followings:
		1. Specified FASTQ actually exists
		2. Rename paths to be compatible with docker
	"""
	# Two cases: V1 and V2 (im using V1 format by default)
	# TODO: different cases for different formats

	# Save file
	base_input_dir = "/input"
	input_dir = os.path.join(base_input_dir, _id)
	new_manifest_name = "new_" + os.path.basename(_file)
	new_manifest_path = os.path.join(input_dir, new_manifest_name)

	df = pd.read_csv(_file)

	# Seems header names are fixed for QIIME2 manifest file
	if("forward-absolute-filepath" in df.columns and "reverse-absolute-filepath" in df.columns):
		df["forward-absolute-filepath"] = "/hostfs" + df["forward-absolute-filepath"]
		df["reverse-absolute-filepath"] = "/hostfs" + df["reverse-absolute-filepath"]
	elif("absolute-filepath" in df.columns):
		df["absolute-filepath"] = "/hostfs" + df["absolute-filepath"]
	else:
		return 400, "Manifest file headers are not compatible with QIIME2 manifest format!"

	if(is_multiple.lower() == "yes"):
		if('run_ID' not in df.columns):
			return 400, "'run_ID' column must exist if 'multiple_run'."

		run_id_col = df['run_ID']
		temp_df = df.drop(['run_ID'], axis=1)

		temp_manifest_name = "temp_" + os.path.basename(_file)
		temp_df_path = new_manifest_path = os.path.join(input_dir, temp_manifest_name)
		temp_df.to_csv(temp_df_path, index=False)

		# Validate it
		code, msg = validate_manifest(temp_df_path, input_format)

		if(code != 200):
			return code, msg
	
	df.to_csv(new_manifest_path, index=False)

	return 200, new_manifest_path