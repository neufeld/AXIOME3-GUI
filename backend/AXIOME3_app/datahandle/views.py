from flask import Blueprint, request, Response, current_app
from flask_mail import Message
from AXIOME3_app.app import mail
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
	extension_helper
)
# Celery task
from AXIOME3_app.tasks.pipeline_config_generator import config_task
from AXIOME3_app.tasks.input_upload import import_data_task
from AXIOME3_app.tasks.denoise import denoise_task
from AXIOME3_app.tasks.analysis import analysis_task
from AXIOME3_app.tasks.pcoa import pcoa_task
from AXIOME3_app.tasks.bubbleplot import bubbleplot_task
from AXIOME3_app.tasks.triplot import triplot_task
from AXIOME3_app.tasks.pipeline import check_output_task

# Custom Exceptions
from AXIOME3_app.exceptions.exception import CustomError

blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

@blueprint.route("/inputupload", methods=['POST'])
def inputupload():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None

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

		config_task_kwargs = {
			'_id': _id,
			'logging_config': log_config_path,
			'manifest_path': manifest_path,
			'sample_type': sample_type,
			'input_format': input_format
		}

		config_task.apply_async(kwargs=config_task_kwargs, link=import_data_task.s(URL, task_progress_file, recipient))

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/denoise", methods=['POST'])
def denoise():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None

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
		
		# Copy input file to premade output dir
		denoise_helper.denoise_setup(denoise_input_path, _id)

		config_task_kwargs = {
			'_id': _id,
			'logging_config': log_config_path,
			'trim_left_f': trim_left_f,
			'trunc_len_f': trunc_len_f,
			'trim_left_r': trim_left_r,
			'trunc_len_r': trunc_len_r,
			'n_cores': n_cores
		}

		config_task.apply_async(kwargs=config_task_kwargs, link=denoise_task.s(URL, task_progress_file, recipient))

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/analysis", methods=['POST'])
def analysis():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None

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
		
		# Copy input file to premade output dir
		analysis_helper.analysis_setup(_id, feature_table_path, rep_seqs_path)

		config_task_kwargs = {
			'_id': _id,
			'logging_config': log_config_path,
			'sampling_depth': sampling_depth,
			'metadata_path': metadata_path,
			'n_cores': n_cores
		}

		config_task.apply_async(kwargs=config_task_kwargs, link=analysis_task.s(URL, task_progress_file, recipient))

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
		colour_set = request.form["Colour set"]
		brewer_type = request.form["brewer type"]
		alpha = request.form["alpha"]
		stroke = request.form["stroke"]
		point_size = request.form["point size"]
		PC_axis_1 = request.form["PC axis 1"]
		PC_axis_2 = request.form["PC axis 2"]
		width = request.form["Width"]
		height = request.form["Height"]
		x_axis_text_size = request.form["x axis label size"]
		y_axis_text_size = request.form["y axis label size"]
		legend_title_size = request.form["legend title size"]
		legend_text_size = request.form["legend text size"]

		pcoa_path, metadata_path = extension_helper.validate_pcoa_input(
			_id=_id,
			pcoa_artifact_path=pcoa_qza,
			metadata_path=metadata,
			target_primary=primary_target,
			target_secondary=secondary_target
		)

		extension_helper.pcoa_setup(_id)

		pcoa_kwargs = {
			'pcoa': pcoa_path,
			'metadata': metadata_path, 
			'colouring_variable': primary_target,
			'shape_variable': secondary_target,
			'colour_set': colour_set,
			'brewer_type': brewer_type,
			'alpha': float(alpha),
			'stroke': float(stroke),
			'point_size': float(point_size),
			'PC_axis_1': PC_axis_1,
			'PC_axis_2': PC_axis_2,
			'width': width,
			'height': height,
			'x_axis_text_size': x_axis_text_size,
			'y_axis_text_size': y_axis_text_size,
			'legend_title_size': legend_title_size,
			'legend_text_size': legend_text_size
		}
		pcoa_task.apply_async(args=[_id, URL, task_progress_file], kwargs=pcoa_kwargs)

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/bubbleplot", methods=['POST'])
def bubbleplot():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("feature_table_qza" in request.files):
			feature_table_qza = request.files["feature_table_qza"]
		else:
			feature_table_qza = request.form["feature_table_qza"]

		if("taxonomy_qza" in request.files):
			taxonomy_qza = request.files["taxonomy_qza"]
		else:
			taxonomy_qza = request.form["taxonomy_qza"]

		taxa_level = request.form["Taxa collapse level"]
		sort_level = request.form["Sort level"]
		keyword_filter = request.form["Keyword filter"] if request.form["Keyword filter"] else None

		feature_table_path, taxonomy_path = extension_helper.validate_bubbleplot_input(
			_id=_id,
			feature_table_artifact_path=feature_table_qza,
			taxonomy_artifact_path=taxonomy_qza
		)

		extension_helper.bubbleplot_setup(_id)

		bubbleplot_kwargs = {
			'feature_table_artifact_path': feature_table_path,
			'taxonomy_artifact_path': taxonomy_path,
			'level': taxa_level,
			'groupby_taxa': sort_level,
			'keyword': keyword_filter
		}
		bubbleplot_task.apply_async(args=[_id, URL, task_progress_file], kwargs=bubbleplot_kwargs)

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/triplot", methods=['POST'])
def triplot():
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
			feature_table_qza = request.files["feature_table"]
		else:
			feature_table_qza = request.form["feature_table"]

		if("taxonomy_qza" in request.files):
			taxonomy_qza = request.files["taxonomy_qza"]
		else:
			taxonomy_qza = request.form["taxonomy_qza"]

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		else:
			metadata = request.form["metadata"]

		if("environmental_metadata" in request.files):
			environmental_metadata = request.files["environmental_metadata"]
		else:
			environmental_metadata = request.form["environmental_metadata"]		

		taxa_collapse_level = request.form["Taxa collapse level"]
		abundance_threshold = request.form["Abundance threshold"]
		R2_threshold = request.form["R squared threshold"]
		wa_threshold = request.form["Taxa weighted average threshold"]
		
		fill_variable = request.form["Fill variable"]
		# Fill variable must exist
		if not(fill_variable):
			return Response("Please specify fill variable!", status=400, mimetype='text/html')

		alpha = request.form["alpha"]
		stroke = request.form["stroke"]
		point_size = request.form["point size"]
		PC_axis_1 = request.form["PC axis 1"]
		PC_axis_2 = request.form["PC axis 2"]
		width = request.form["Width"]
		height = request.form["Height"]
		x_axis_text_size = request.form["x axis label size"]
		y_axis_text_size = request.form["y axis label size"]
		legend_title_size = request.form["legend title size"]
		legend_text_size = request.form["legend text size"]

		feature_table_path, taxonomy_path, metadata_path, environmental_metadata_path = extension_helper.validate_triplot_input(
			_id=_id,
			feature_table_artifact_path=feature_table_qza,
			taxonomy_artifact_path=taxonomy_qza,
			metadata_path=metadata,
			environmental_metadata_path=environmental_metadata,
			fill_variable=fill_variable
		)

		extension_helper.triplot_setup(_id)

		triplot_kwargs = {
			'feature_table_artifact_path': feature_table_path,
			'taxonomy_artifact_path': taxonomy_path,
			'metadata_path': metadata_path,
			'environmental_metadata_path': environmental_metadata_path,
			'taxa_collapse_level': taxa_collapse_level,
			'abundance_threshold': float(abundance_threshold),
			'R2_threshold': float(R2_threshold),
			'wa_threshold': float(wa_threshold),
			'fill_variable': fill_variable,
			'width': float(width),
			'height': float(height)
		}
		triplot_task.apply_async(args=[_id, URL, task_progress_file], kwargs=triplot_kwargs)

	except CustomError as err:
		return err.response

	return Response("Success!", status=200, mimetype='text/html')