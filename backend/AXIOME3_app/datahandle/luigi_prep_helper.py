import os
import sys
import pandas as pd

def make_dir(_id, dirpath):
	"""
	Make directory with given UUID as directory name.
	"""
	try:
		os.mkdir(dirpath)
	
	except OSError: 
		return False	

	return True

def make_output_dir(_id):
	"""
	Make sub-directory in /output to store output for each request.

	Input:
		- _id: UUID4 in string representation.

	Returns: status code and message
	"""
	# /output should already exist inside the docker container as a bind mount.
	base_output_dir = "/output"
	output_dir = os.path.join(base_output_dir, _id)

	isMade = make_dir(_id, output_dir)

	if(isMade == False):
		#TODO: log failure
		code = 500
		message = "Can't make output directory."

		return code, message

	return 200, "Success"

def make_log_dir(_id):
	"""
	Make sub-directory in /log to store log files for each request.

	Input:
		- _id: UUID4 in string representation.

	Returns: status code and message
	"""
	# /log should already exist inside the docker container as a bind mount.
	base_log_dir = "/log"
	log_dir = os.path.join(base_log_dir, _id)

	isMade = make_dir(_id, log_dir)

	if(isMade == False):
		#TODO: log failure
		code = 500
		message = "Can't make log directory."

		return code, message

	return 200, "Success"

def save_upload(_id, _file):
	"""
	Saves upload data on the server.

	Input:
		- _id: UUID4 in string representation.
		- _file: FileStorage Object

	Returns: status code and result
	"""
	# /input should already exist as a named volume.
	# only available in backend and celery services
	base_input_dir = "/input"
	input_dir = os.path.join(base_input_dir, _id)

	isMade = make_dir(_id, input_dir)

	if(isMade == False):
		#TODO: log failure
		code = 500
		message = "Can't make input directory."

	# File name to save as
	input_path = os.path.join(input_dir, _file.filename)

	_file.save(input_path)

	return 200, input_path

def reformat_manifest(_id, _file, format="PairedEndFastqManifestPhred33"):
	"""
	Check the followings:
		1. Specified FASTQ actually exists
		2. Rename paths to be compatible with docker
	"""


	# Two cases: V1 and V2 (im using V1 format by default)
	# TODO: different cases for different formats

	df = pd.read_csv(_file)

	# TODO: Exception if given relative path

	# Seems header names are fixed for QIIME2 manifest file
	df["absolute-filepath"] = "/hostfs" + df["absolute-filepath"]

	# TODO: Exception if data does not exist

	# Save file
	base_input_dir = "/input"
	input_dir = os.path.join(base_input_dir, _id)

	new_manifest_name = "new_" + os.path.basename(_file)
	new_manifest_path = os.path.join(input_dir, new_manifest_name)
	df.to_csv(new_manifest_path, index=False)

	return 200, new_manifest_path