"""
This is strictly for flask related util (helper) functions.
For example, error handling.
"""
import os
from flask import Response
from flask import current_app

from AXIOME3_app.exceptions.exception import AXIOME3Error

# Messages
from AXIOME3_app.messages.message import (
	INTERNAL_SERVER_ERROR_MESSAGE
)
import sys

from AXIOME3_app.constants import (
	INPUT_UPLOAD_DIR,
	DENOISE_DIR,
	ANALYSIS_DIR,
	TAXONOMIC_CLASSIFICATION_DIR,
	PHYLOGENY_DIR,
	METRICS_DIR,
	PCOA_DIR,
)

def responseIfError(func, **kwargs):
	"""
	Executes a custom function.
	If error, raises an exception with appropriate response.

	Input:
		func: A function to be run. MUST return status code and result (of any type).
		kwargs: keyword arguments to be passed to the custom function.
	"""
	code, result = func(**kwargs)
	if(code != 200):
		# Log error message
		current_app.logger.error(result)

		if(str(code).startswith("5")):
			response = Response(INTERNAL_SERVER_ERROR_MESSAGE, status=code, mimetype='text/html')

		elif(str(code).startswith("4")):
			# Remove "/hostfs" if any
			result = result.replace("/hostfs", "")
			response = Response(result, status=code, mimetype='text/html')

		raise AXIOME3Error(result, response)

	return result

def get_input_upload_dir(_id):
	"""
	Return path to input upload directory
	"""
	return os.path.join('/output', _id, INPUT_UPLOAD_DIR)

def get_denoise_dir(_id):
	"""
	Return path to denoise directory
	"""
	return os.path.join('/output', _id, DENOISE_DIR)

def get_taxonomic_classification_dir(_id):
	"""
	Return path to taxonomic classification directory
	"""
	return os.path.join('/output', _id, TAXONOMIC_CLASSIFICATION_DIR)

def get_analysis_dir(_id):
	"""
	Return path to analysis directory
	"""
	return os.path.join('/output', _id, ANALYSIS_DIR)

def get_phylogeny_dir(_id):
	"""
	Return path to phylogeny directory
	"""
	return os.path.join('/output', _id, PHYLOGENY_DIR)

def get_metrics_dir(_id):
	"""
	Return path to alpha/beta metrics directory
	"""
	return os.path.join('/output', _id, METRICS_DIR)

def get_pcoa_plots_dir(_id):
	"""
	Return path to PCoA plots directory
	"""
	return os.path.join('/output', _id, PCOA_DIR)