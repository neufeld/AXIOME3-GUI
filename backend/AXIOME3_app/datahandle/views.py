from flask import Blueprint, request, Response, current_app
import uuid
import os
#from werkzeug import secure_filename
# For console debugging
import sys

# Custom modules
from AXIOME3_app.datahandle import config_generator
from AXIOME3_app.datahandle import (
	luigi_prep_helper,
	input_upload_helper,
	denoise_helper,
	analysis_helper,
	pcoa_helper
)
# Celery task
from AXIOME3_app.tasks.input_upload import import_data_task
from AXIOME3_app.tasks.denoise import denoise_task
from AXIOME3_app.tasks.analysis import analysis_task
from AXIOME3_app.tasks.pcoa import pcoa_task
from AXIOME3_app.tasks.pipeline import check_output_task

# Custom Exceptions
from AXIOME3_app.exceptions.exception import CustomError

blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

@blueprint.route("/inputupload", methods=['POST'])
def inputupload():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("manifest" in request.files):
			manifest_file = request.files["manifest"]
		else:
			manifest_file = request.form["manifest"]
			
		input_format = request.form["Input Format"]
		sample_type = request.form["Sample Type"]

		# Do preliminary checks on manifest file
		manifest_path = input_upload_helper.input_upload_precheck(
			_id=_id,
			uploaded_manifest=manifest_file,
			input_format=input_format
		)

		# Prepare necessary files for input upload
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		luigi_prep_helper.luigi_config_generator(
			_id=_id,
			log_config_path=log_config_path,
			manifest_path=manifest_path,
			sample_type=sample_type,
			input_format=input_format
		)

		import_data_task.apply_async(args=[_id, URL, task_progress_file])
	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/denoise", methods=['POST'])
def denoise():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("demultiplexed" in request.files):
			imported_qza = request.files["demultiplexed"]
		else:
			imported_qza = request.form["demultiplexed"]

		trunc_len_f = request.form["trunc-len-f"]
		trunc_len_r = request.form["trunc-len-r"]
		trim_left_f = request.form["trim-left-f"]
		trim_left_r = request.form["trim-left-r"]
		n_cores = request.form["cores"]

		denoise_input_path = denoise_helper.denoise_precheck(
			_id=_id,
			sequence_data=imported_qza
		)

		# Prepare necessary files for denoise
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		luigi_prep_helper.luigi_config_generator(
			_id=_id,
			log_config_path=log_config_path,
			trim_left_f=trim_left_f,
			trunc_len_f=trunc_len_f,
			trim_left_r=trim_left_r,
			trunc_len_r=trunc_len_r,
			n_cores=n_cores
		)

		# Copy input file to premade output dir
		denoise_helper.denoise_setup(denoise_input_path, _id)

		denoise_task.apply_async(args=[_id, URL, task_progress_file])
	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/analysis", methods=['POST'])
def analysis():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("feature_table" in request.files):
			feature_table = request.files["feature_table"]
		else:
			feature_table = request.form["feature_table"]

		if("rep_seqs" in request.files):
			rep_seqs = request.files["rep_seqs"]
		else:
			rep_seqs = request.form["rep_seqs"]

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		else:
			metadata = request.form["metadata"]

		sampling_depth = request.form["sampling depth"]
		n_cores = request.form["cores"]

		feature_table_path, rep_seqs_path, metadata_path = analysis_helper.analysis_precheck(
			_id=_id,
			feature_table=feature_table,
			rep_seqs=rep_seqs,
			metadata=metadata
		)

		# Prepare necessary files for anlysis
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		luigi_prep_helper.luigi_config_generator(
			_id=_id,
			log_config_path=log_config_path,
			sampling_depth=sampling_depth,
			metadata_path=metadata_path,
			n_cores=n_cores
		)

		# Copy input file to premade output dir
		analysis_helper.analysis_setup(_id, feature_table_path, rep_seqs_path)

		analysis_task.apply_async(args=[_id, URL, task_progress_file])

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/pcoa", methods=['POST'])
def pcoa():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("pcoa_qza" in request.files):
			pcoa_qza = request.files["pcoa_qza"]
		else:
			pcoa_qza = request.form["pcoa_qza"]

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		else:
			metadata = request.form["metadata"]

		primary_target = request.form["Primary target"]
		# Primary target must exist
		if not(primary_target):
			return Response("Please specify primary target!", status=400, mimetype='text/html')

		secondary_target = request.form["Secondary target"] if request.form["Secondary target"] else None
		alpha = request.form["alpha"]
		stroke = request.form["stroke"]
		point_size = request.form["point size"]

		metadata_path = pcoa_helper.validate_pcoa_input(
			_id=_id,
			metadata=metadata,
			target_primary=primary_target,
			target_secondary=secondary_target
		)

		pcoa_path = pcoa_helper.pcoa_setup(
			_id=_id,
			pcoa=pcoa_qza
		)

		pcoa_kwargs = {
			'pcoa': pcoa_path,
			'metadata': metadata_path, 
			'colouring_variable': primary_target,
			'shape_variable': secondary_target,
			'alpha': float(alpha),
			'stroke': float(stroke),
			'point_size': float(point_size)
		}
		pcoa_task.apply_async(args=[_id, URL, task_progress_file], kwargs=pcoa_kwargs)

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')