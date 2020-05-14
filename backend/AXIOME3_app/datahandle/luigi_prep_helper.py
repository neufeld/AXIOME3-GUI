import os
import shutil
from werkzeug.datastructures import FileStorage
from textwrap import dedent

# Flask backend util functions
from AXIOME3_app import utils

# Config helper functions
from AXIOME3_app.datahandle import config_generator

def make_dir(dirpath):
	"""
	Make directory with given UUID as directory name.
	"""
	try:
		os.makedirs(dirpath, exist_ok=True)
	
	except OSError as err:
		message = dedent(
			"""\
			Can't create a directory {dir}.
			Detail: In {module} - {err}\n
			""".format(err=str(err),
								module=__name__,
								dir=dirpath)
		)
		return 500, message

	except Exception as err:
		message = str(err)

		return 500, message	

	return 200, "OK"

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

	utils.responseIfError(make_dir, dirpath=output_dir)

	return 200, "OK"

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

	utils.responseIfError(make_dir, dirpath=log_dir)

	return 200, "OK"

def save_filestorage(_id, _file):
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

	utils.responseIfError(make_dir, dirpath=input_dir)

	# File name to save as
	input_path = os.path.join(input_dir, _file.filename)

	_file.save(input_path)

	return 200, input_path

def save_uploaded_file(_id, uploaded_file):
	if(isinstance(uploaded_file, FileStorage)):
		upload_path = utils.responseIfError(save_filestorage, _id=_id, _file=uploaded_file)
	else:
		upload_path = uploaded_file

	return upload_path

def copy_file(source, destination):
	try:
		shutil.copyfile(source, destination)

	except Exception as err:
		message = str(err)

		return 500, message

	return 200, "OK"

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

def luigi_config_generator(_id, log_config_path, **kwargs):
	"""
	Run all "Input Upload" related steps

	Input:
		- manifest_path: path to manifest file in the container
		- _id: UUID4 in string representation
		- log_config_path: path to logging configuration file.
	"""
	config_path = utils.responseIfError(config_generator.make_luigi_config,
																			_id=_id,
																			logging_config=log_config_path,
																			**kwargs)