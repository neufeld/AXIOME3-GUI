import os
import sys
import pandas as pd
from flask import current_app
from textwrap import dedent
import copy

# Flask backend util functions
from AXIOME3_app import utils

# Config helper functions
from AXIOME3_app.datahandle import config_generator

def make_dir(dirpath):
	"""
	Make directory with given UUID as directory name.
	"""
	try:
		os.mkdir(dirpath)
	
	except OSError as err:
		message = dedent(
			"""\
			Can't create a directory {dir}.
			Detail: In {module} - {err}\n
			""".format(err=str(err),
								module=__name__,
								dir=dirpath)
		)
		current_app.logger.error(message)

		return False, message	

	return True, ""

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

	isMade, message = make_dir(output_dir)

	if(isMade == False):
		#TODO: log failure
		code = 500

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

	isMade, message = make_dir(log_dir)

	if(isMade == False):
		code = 500

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

	isMade, message = make_dir(input_dir)

	if(isMade == False):
		code = 500

		return code, message

	# File name to save as
	input_path = os.path.join(input_dir, _file.filename)

	_file.save(input_path)

	return 200, input_path

def input_upload_pre_check(_id, request):
	"""
	Do pre-checks as to decrease the chance of job failing.

	Tests the followings:
		1. manifest file
			- fastq files exist?
			- duplicate entries?
			- absoluate filepath?

	Returns:
		- status code and message
	"""
	# Save uploaded manifest file in the docker container
	manifest_path = utils.responseIfError(save_upload, _id=_id, _file=request.files["manifest"])

	utils.responseIfError(manifest_fastq_exist, manifest_path=manifest_path)

	return manifest_path

def manifest_fastq_exist(manifest_path):
	"""
	Check if fastq files actually exist on the host.

	Input:
		- manifest_path: path to manifest file in the container

	Returns:
		- doesExist: pandas series indicating whether each fastq in the manifest file exist on the host.
	"""
	df = pd.read_csv(manifest_path)
	df_original = copy.deepcopy(df)
	# Seems header names are fixed for QIIME2 manifest file
	df["absolute-filepath"] = "/hostfs" + df["absolute-filepath"]

	doesExist = df.apply(lambda x: os.path.exists(x["absolute-filepath"]), axis=1)

	# Fastq files exist?
	if(doesExist.all() == False):
		non_file_list = df_original.loc[~doesExist, "absolute-filepath"].values
		
		code = 400
		# Client error message
		client_message = dedent("""\
			Error in the manifest file.
			Following FASTQ files do NOT exist:
			{files}
		""".format(files='\n'.join(non_file_list)))

		# Log error message
		log_message = dedent("""\
			Error in the manifest file, {manifest}.
			Following FASTQ files do NOT exist:
			{files}
		""".format(manifest=manifest_path,
							files='\n'.join(non_file_list)))

		current_app.logger.error(log_message)

		return code, client_message

	return 200, "Success"


def reformat_manifest(_id, _file, format="PairedEndFastqManifestPhred33"):
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

def pipeline_setup(_id):
	"""
	Set up directories (output, log, config) prior to running the pipeline.
	This is to be run in every type of request.

	Input:
		- _id: UUID4 in string representation

	Returns:
		- log_config_path: path to logging configuration file.
	"""
	utils.responseIfError(make_output_dir, _id=_id)

	# Make sub log dir in /log
	utils.responseIfError(make_log_dir, _id=_id)

	# Create luigi logging config file
	log_config_path = utils.responseIfError(config_generator.make_log_config, _id=_id)

	return log_config_path

def input_upload(manifest_path, _id, log_config_path):
	"""
	Run all "Input Upload" related steps

	Input:
		- manifest_path: path to manifest file in the container
		- _id: UUID4 in string representation
		- log_config_path: path to logging configuration file.
	"""
	new_manifest_path = utils.responseIfError(reformat_manifest, _id=_id, _file=manifest_path)
	code, config_path = config_generator.make_luigi_config(_id, log_config_path, manifest=new_manifest_path)