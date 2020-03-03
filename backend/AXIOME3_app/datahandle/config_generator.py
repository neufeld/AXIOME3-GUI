import os
import sys

def make_luigi_config(_id, logging_config, manifest=None, sample_type=None, input_format=None,
				trim_left_f=None, trunc_len_f=None, trim_left_r=None, trunc_len_r=None,
				classifier=None, sampling_depth=None):
	"""
	Make configuration file for luigi from the template file
	(at /pipeline/AXIOME3/configuration/template.cfg).

	- Returns: path to the new configuration file.
	"""
	# AXIOME3 is installed in the container via a dockerfile.
	# backend/dev.dockerfile
	template_config_path = "/pipeline/AXIOME3/configuration/template.cfg"

	config_data = read_template_config(template_config_path)

	# TEMPORARY: sample_type and input_format will have fixed values.
	sample_type = "SampleData[PairedEndSequencesWithQuality]"
	input_format = "PairedEndFastqManifestPhred33"

	# Replace output prefix placeholder with actual path
	output_dir = os.path.join("/output", _id)
	config_data = config_data.replace("<OUTPUT>", output_dir)

	# Replace logging path placeholder with actual path
	config_data = config_data.replace("<LUIGI_CONFIG_FILE>", logging_config)

	# Replace resptive field with user specified values
	if(manifest is not None):
		config_data = config_data.replace("<MANIFEST_PATH>", manifest)

	if(sample_type is not None):
		config_data = config_data.replace("<SAMPLE_TYPE>", sample_type)

	if(input_format is not None):
		config_data = config_data.replace("<INPUT_FORMAT>", input_format)

	if(trim_left_f is not None):
		config_data = config_data.replace("<TRIM_LEFT_F>", trim_left_f)

	if(trunc_len_f is not None):
		config_data = config_data.replace("<TRUNC_LEN_F>", trunc_len_f)

	if(trim_left_r is not None):
		config_data = config_data.replace("<TRIM_LEFT_R>", trim_left_r)

	if(trunc_len_r is not None):
		config_data = config_data.replace("<TRUNC_LEN_R>", trunc_len_r)

	if(classifier is not None):
		config_data = config_data.replace("<CLASSIFIER_PATH>", classifier)

	if(sampling_depth is not None):
		config_data = config_data.replace("<SAMPLING_DEPTH>", sampling_depth)

	# Overwrite existing config file
	# Can't set env variable inside docker container,
	# so need to have one master config file
	master_config_path = "/pipeline/AXIOME3/configuration/luigi.cfg"

	try:
		with open(master_config_path, 'w') as fh:
			fh.write(config_data)
	except OSError:
		# TODO: log
		message = "Cant create a luigi config file."
		code = 500

		return code, message

	# Make a copy for debugging purpose
	base_dir = os.path.join('/output', _id)
	new_config_path = os.path.join(base_dir, "luigi.cfg")

	try:
		with open(new_config_path, 'w') as fh:
			fh.write(config_data)
	except OSError:
		# TODO: log
		message = "Cant create a luigi config file."
		code = 500

		return code, message 

	# Return the complete configuration path so that it can be set
	# as an environment variable.	
	return 200, master_config_path

def make_log_config(_id):
	"""
	Make logging configuration file from the template.

	Returns status code and result (fail messsage in case of a failure)
	"""
	template_config_path = "/pipeline/AXIOME3/configuration/logging.conf"
	config_data = read_template_config(template_config_path)

	base_dir = os.path.join('/log', _id)
	logfile_path = os.path.join(base_dir, "luigi_log.log")
	config_data = config_data.replace("<LOGFILE_PATH>", str(logfile_path))

	# Write a new config file
	new_config_path = os.path.join(base_dir, "logging.conf")

	try:
		with open(new_config_path, 'w') as fh:
			fh.write(config_data)
	except OSError:
		# TODO: log
		message = "Cant create a log config file."
		code = 500

		return code, message 

	return 200, new_config_path
	
def read_template_config(path):
	"""
	Read template configuration file, and store it as a string.

	- Returns: file content as a string.
	"""
	with open(path, 'r') as fh:
		file_content = fh.readlines()

	return ''.join(file_content)