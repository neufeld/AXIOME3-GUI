import os
import sys
import shutil
import pandas as pd
from flask import current_app
from werkzeug.datastructures import FileStorage
from textwrap import dedent

# QIIME2 modules
import qiime2
import q2_types
from qiime2 import Artifact

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

	utils.responseIfError(make_dir, dirpath=input_dir)

	# File name to save as
	input_path = os.path.join(input_dir, _file.filename)

	_file.save(input_path)

	return 200, input_path

def copy_file(source, destination):
	try:
		shutil.copyfile(source, destination)

	except Exception as err:
		message = str(err)

		return 500, message

	return 200, "OK"

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
		manifest_path = utils.responseIfError(save_upload, _id=_id, _file=uploaded_manifest)
	else:
		manifest_path = uploaded_manifest
		base_input_dir = "/input"
		input_dir = os.path.join(base_input_dir, _id)

		utils.responseIfError(make_dir, dirpath=input_dir)


	new_manifest_path = utils.responseIfError(reformat_manifest, _id=_id, _file=manifest_path)
	utils.responseIfError(validate_manifest, manifest_path=new_manifest_path, input_format=input_format)

	return new_manifest_path

def validate_manifest(manifest_path, input_format):
	"""
	Validate user supplied manifest file using QIIME2 modules.
	"""

	try:
		if(input_format == "SingleEndFastqManifestPhred33"):
			q2_types.per_sample_sequences.SingleEndFastqManifestPhred33(manifest_path, mode='r').validate()
		elif(input_format == "SingleEndFastqManifestPhred33V2"):
			q2_types.per_sample_sequences.SingleEndFastqManifestPhred33V2(manifest_path, mode='r').validate()
		elif(input_format == "SingleEndFastqManifestPhred64"):
			q2_types.per_sample_sequences.SingleEndFastqManifestPhred64(manifest_path, mode='r').validate()
		elif(input_format == "SingleEndFastqManifestPhred64V2"):
			q2_types.per_sample_sequences.SingleEndFastqManifestPhred64V2(manifest_path, mode='r').validate()
		elif(input_format == "PairedEndFastqManifestPhred33"):
			q2_types.per_sample_sequences.PairedEndFastqManifestPhred33(manifest_path, mode='r').validate()
		elif(input_format == "PairedEndFastqManifestPhred33V2"):
			q2_types.per_sample_sequences.PairedEndFastqManifestPhred33V2(manifest_path, mode='r').validate()
		elif(input_format == "PairedEndFastqManifestPhred64"):
			q2_types.per_sample_sequences.PairedEndFastqManifestPhred64(manifest_path, mode='r').validate()
		elif(input_format == "PairedEndFastqManifestPhred64V2"):
			q2_types.per_sample_sequences.PairedEndFastqManifestPhred64V2(manifest_path, mode='r').validate()
		else:
			invalid_format_msg = \
				"Specified input format, {input_format}, is not compatible with QIIME2..."\
				.format(input_format=input_format)

			raise ValueError(invalid_format_msg)

	except qiime2.core.exceptions.ValidationError as err:
		message = str(err)

		return 400, message

	except ValueError as err:
		message = str(err)

		return 400, message


	return 200, "Manifest good!"

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

def denoise_precheck(_id, input_file):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- input_file: QIIME2 artifact
	"""
	# Save uploaded file in the docker container
	if(isinstance(input_file, FileStorage)):
		upload_path = utils.responseIfError(save_upload, _id=_id, _file=input_file)
	else:
		upload_path = input_file

	utils.responseIfError(validate_denoise_input, input_file=upload_path)

	return upload_path

def validate_denoise_input(input_file):
	"""
	Precheck input files prior to running denoise step

	Input:
		- input_file: QIIME2 artifact
	"""

	# Check Artifact type
	try:
		q2_artifact = Artifact.load(input_file)
		if(str(q2_artifact.type) != "SampleData[PairedEndSequencesWithQuality]"):
			msg = "Input QIIME2 Artifact is not of type 'SampleData[PairedEndSequencesWithQuality]'!"
			raise ValueError(msg)
	except ValueError as err:
		message = str(err)

		return 400, message

	return 200, "Imported data good!"

def denoise_setup(denoise_input, _id):
	destination_dir = os.path.join('/output', _id)
	destination = os.path.join(destination_dir, "paired_end_demux.qza")

	utils.responseIfError(make_dir, dirpath=destination_dir)
	utils.responseIfError(copy_file, source=denoise_input, destination=destination)

def analysis_precheck(_id, feature_table, rep_seqs, metadata):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- feature_table: QIIME2 artifact of type FeatureTable[Frequency]
		- rep_seqs: QIIME2 artifact of type FeatureData[Sequence]
	"""
	if(isinstance(feature_table, FileStorage)):
		feature_table_path = utils.responseIfError(save_upload, _id=_id, _file=feature_table)
	else:
		feature_table_path = feature_table

	if(isinstance(rep_seqs, FileStorage)):
		rep_seqs_path = utils.responseIfError(save_upload, _id=_id, _file=rep_seqs)
	else:
		rep_seqs_path = rep_seqs

	if(isinstance(metadata, FileStorage)):
		metadata_path = utils.responseIfError(save_upload, _id=_id, _file=metadata)
	else:
		metadata_path = metadata
	
	utils.responseIfError(validate_analysis_input, feature_table=feature_table_path, rep_seqs=rep_seqs_path)

	return feature_table_path, rep_seqs_path, metadata_path

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

def analysis_setup(_id, feature_table, rep_seqs):
	destination_dir = os.path.join('/output', _id, 'dada2', 'merged')
	feature_table_destination = os.path.join(destination_dir, "merged_table.qza")
	rep_seqs_destination = os.path.join(destination_dir, "merged_rep_seqs.qza")

	utils.responseIfError(make_dir, dirpath=destination_dir)
	utils.responseIfError(copy_file, source=feature_table, destination=feature_table_destination)
	utils.responseIfError(copy_file, source=rep_seqs, destination=rep_seqs_destination)

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