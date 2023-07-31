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
	taxonomic_classification_helper,
	analysis_helper,
	extension_helper
)
# Celery task
from AXIOME3_app.tasks.pipeline_config_generator import config_task
from AXIOME3_app.tasks.input_upload import import_data_task
from AXIOME3_app.tasks.denoise import denoise_task
from AXIOME3_app.tasks.taxonomic_classification import taxonomic_classification_task
from AXIOME3_app.tasks.analysis import analysis_task
from AXIOME3_app.tasks.pcoa import pcoa_task
from AXIOME3_app.tasks.bubbleplot import bubbleplot_task
from AXIOME3_app.tasks.triplot import triplot_task
from AXIOME3_app.tasks.pipeline import check_output_task

# Custom Exceptions
from AXIOME3_app.exceptions.exception import AXIOME3Error

from AXIOME3_app.email.gmail import SendMessage

def send_queue_email(_id, sender, recipient, taskName):
	if(recipient is not None):
		subject = "AXIOME3 task queued"
		msgHtml = """
				<div>
					<h2>Session ID</h2>
					<p>{_id}</p>
					<h2>Message</h2>
					<p>{taskName} task queued</p>
				</div>
			""".format(_id=_id, taskName=taskName)
		SendMessage(
			sender=sender,
			recipient=recipient,
			subject=subject,
			msgHtml=msgHtml
		)

blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

@blueprint.route("/inputupload", methods=['POST'])
def inputupload():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None
	
	# get type of task
	task_type = str(request.form['formType'])

	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]
	sender = current_app.config["GMAIL_SENDER"]

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("manifest" in request.files):
			manifest_file = request.files["manifest"]
		elif("manifest" in request.form):
			manifest_file = request.form["manifest"]
		else:
			raise FileNotFoundError("Manifest file must be uploaded!")
			
		input_format = request.form["Input Format"]
		sample_type = request.form["Sample Type"]
		is_multiple = request.form["multiple run"]

		# Do preliminary checks on manifest file
		manifest_path = input_upload_helper.input_upload_precheck(
			_id=_id,
			uploaded_manifest=manifest_file,
			input_format=input_format,
			is_multiple=is_multiple
		)

		# Prepare necessary files for input upload
		log_config_path = luigi_prep_helper.pipeline_setup(_id)

		task_kwargs = {
			'_id': _id,
			'task_type': task_type,
			'logging_config': log_config_path,
			'manifest_path': manifest_path,
			'sample_type': sample_type,
			'input_format': input_format,
			'is_multiple': is_multiple,
			'URL': URL,
			'task_progress_file': task_progress_file,
			'sender': sender,
			'recipient': recipient
		}

		send_queue_email(_id, sender, recipient, "Input Upload")
		import_data_task.apply_async(kwargs=task_kwargs, task_id=_id)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/denoise", methods=['POST'])
def denoise():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None
	sender = current_app.config["GMAIL_SENDER"]

	task_type = str(request.form['formType'])

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
		elif("manifest" in request.form):
			manifest_file = request.form["manifest"]
		else:
			raise FileNotFoundError("Manifest file must be uploaded!")

		input_format = request.form["Input Format"]
		sample_type = request.form["Sample Type"]
		is_multiple = request.form["multiple run"]
		trunc_len_f = request.form["trunc-len-f"]
		trunc_len_r = request.form["trunc-len-r"]
		trim_left_f = request.form["trim-left-f"]
		trim_left_r = request.form["trim-left-r"]
		n_cores = request.form["cores"]

		#denoise_input_path = denoise_helper.denoise_precheck(
		#	_id=_id,
		#	sequence_data=imported_qza
		#)
		manifest_path = input_upload_helper.input_upload_precheck(
			_id=_id,
			uploaded_manifest=manifest_file,
			input_format=input_format,
			is_multiple=is_multiple
		)

		# Prepare necessary files for denoise
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		
		# Copy input file to premade output dir
		#denoise_helper.denoise_setup(denoise_input_path, _id)

		task_kwargs = {
			'_id': _id,
			'task_type': task_type,
			'logging_config': log_config_path,
			'manifest_path': manifest_path,
			'sample_type': sample_type,
			'input_format': input_format,
			'trim_left_f': trim_left_f,
			'trunc_len_f': trunc_len_f,
			'trim_left_r': trim_left_r,
			'trunc_len_r': trunc_len_r,
			'is_multiple': is_multiple,
			'n_cores': n_cores,
			'URL': URL,
			'task_progress_file': task_progress_file,
			'sender': sender,
			'recipient': recipient
		}
		
		send_queue_email(_id, sender, recipient, "Denoise")
		denoise_task.apply_async(kwargs=task_kwargs, task_id=_id)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/taxonomic_classification", methods=['POST'])
def taxonomic_classification():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None
	sender = current_app.config["GMAIL_SENDER"]

	task_type = str(request.form['formType'])

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
		elif("feature_table" in request.form):
			feature_table = request.form["feature_table"]
		else:
			raise FileNotFoundError("Feature table must be uploaded!")

		if("rep_seqs" in request.files):
			rep_seqs = request.files["rep_seqs"]
		elif("rep_seqs" in request.form):
			rep_seqs = request.form["rep_seqs"]
		else:
			raise FileNotFoundError("Representative sequences must be uploaded!")

		if("classifier" in request.files):
			classifier = request.files["classifier"]
		elif("classifier" in request.form):
			classifier = request.form["classifier"]
		else:
			# use default classifier it not specified by users
			# read the value from env file?
			#classifier = "/pipeline/AXIOME3/2020_06_classifier_silva138_NR99_V4V5.qza"
			classifier = None

		n_cores = request.form["cores"]

		feature_table_path, rep_seqs_path, classifier_path = taxonomic_classification_helper.taxonomic_classification_precheck(
			_id=_id,
			feature_table=feature_table,
			rep_seqs=rep_seqs,
			classifier=classifier
		)

		# Prepare necessary files for anlysis
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		
		# Copy input file to premade output dir
		taxonomic_classification_helper.taxonomic_classification_setup(_id, feature_table_path, rep_seqs_path)

		task_kwargs = {
			'_id': _id,
			'task_type': task_type,
			'logging_config': log_config_path,
			'classifier_path': classifier_path,
			'n_cores': n_cores,
			'URL': URL,
			'task_progress_file': task_progress_file,
			'sender': sender,
			'recipient': recipient
		}

		send_queue_email(_id, sender, recipient, "Taxonomic Classification")
		taxonomic_classification_task.apply_async(kwargs=task_kwargs, task_id=_id)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/analysis", methods=['POST'])
def analysis():
	# Email ricipient
	if("email" in request.form):
		recipient = request.form["email"]
	else:
		recipient = None
	sender = current_app.config["GMAIL_SENDER"]

	task_type = str(request.form['formType'])

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
		elif("feature_table" in request.form):
			feature_table = request.form["feature_table"]
		else:
			raise FileNotFoundError("Feature table must be uploaded!")

		if("rep_seqs" in request.files):
			rep_seqs = request.files["rep_seqs"]
		elif("rep_seqs" in request.form):
			rep_seqs = request.form["rep_seqs"]
		else:
			raise FileNotFoundError("Representative sequences must be uploaded!")

		if("taxonomy_qza" in request.files):
			taxonomy_qza = request.files["taxonomy_qza"]
		elif("taxonomy_qza" in request.form):
			taxonomy_qza = request.form["taxonomy_qza"]
		else:
			raise FileNotFoundError("Taxonomy file must be uploaded!")

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		elif("metadata" in request.form):
			metadata = request.form["metadata"]
		else:
			raise FileNotFoundError("Metadata must be uploaded!")

		sampling_depth = request.form["sampling depth"]
		n_cores = request.form["cores"]

		feature_table_path, rep_seqs_path, taxonomy_path, metadata_path = analysis_helper.analysis_precheck(
			_id=_id,
			feature_table=feature_table,
			rep_seqs=rep_seqs,
			taxonomy=taxonomy_qza,
			metadata=metadata,
		)

		# Prepare necessary files for anlysis
		log_config_path = luigi_prep_helper.pipeline_setup(_id)
		
		# Copy input file to premade output dir
		analysis_helper.analysis_setup(_id, feature_table_path, rep_seqs_path, taxonomy_path)

		task_kwargs = {
			'_id': _id,
			'task_type': task_type,
			'logging_config': log_config_path,
			'sampling_depth': sampling_depth,
			'metadata_path': metadata_path,
			'n_cores': n_cores,
			'URL': URL,
			'task_progress_file': task_progress_file,
			'sender': sender,
			'recipient': recipient
		}

		send_queue_email(_id, sender, recipient, "Analysis")
		analysis_task.apply_async(kwargs=task_kwargs, task_id=_id)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/pcoa", methods=['POST'])
def pcoa():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	task_type = str(request.form['formType'])

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("pcoa_qza" in request.files):
			pcoa_qza = request.files["pcoa_qza"]
		elif("pcoa_qza" in request.form):
			pcoa_qza = request.form["pcoa_qza"]
		else:
			raise FileNotFoundError("PCoA artifact must be uploaded!")

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		elif("metadata" in request.form):
			metadata = request.form["metadata"]
		else:
			raise FileNotFoundError("Sample metadata must be uploaded!")

		fill_variable = request.form["Fill variable"]
		# Primary target must exist
		if not(fill_variable):
			return Response("Please specify `Fill variable`!", status=400, mimetype='text/html')
		fill_variable_dtype = request.form["Fill variable data type"]

		shape_variable = request.form["Shape variable"] if request.form["Shape variable"] else None
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
			target_primary=fill_variable,
			target_secondary=shape_variable
		)

		extension_helper.pcoa_setup(_id)

		pcoa_kwargs = {
			'pcoa': pcoa_path,
			'metadata': metadata_path, 
			'fill_variable': fill_variable,
			'fill_variable_dtype': fill_variable_dtype,
			'shape_variable': shape_variable,
			'colour_set': colour_set,
			'brewer_type': brewer_type,
			'alpha': float(alpha),
			'stroke': float(stroke),
			'point_size': float(point_size),
			'PC_axis_1': int(PC_axis_1),
			'PC_axis_2': int(PC_axis_2),
			'width': width,
			'height': height,
			'x_axis_text_size': x_axis_text_size,
			'y_axis_text_size': y_axis_text_size,
			'legend_title_size': legend_title_size,
			'legend_text_size': legend_text_size
		}
		pcoa_task.apply_async(
			args=[_id, task_type, URL, task_progress_file],
			kwargs=pcoa_kwargs,
			task_id=_id,
		)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/bubbleplot", methods=['POST'])
def bubbleplot():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	task_type = str(request.form['formType'])

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("feature_table" in request.files):
			feature_table_qza = request.files["feature_table"]
		elif("feature_table" in request.form):
			feature_table_qza = request.form["feature_table"]
		else:
			raise FileNotFoundError("Feature table must be uploaded!")

		if("taxonomy_qza" in request.files):
			taxonomy_qza = request.files["taxonomy_qza"]
		elif("taxonomy_qza" in request.form):
			taxonomy_qza = request.form["taxonomy_qza"]
		else:
			raise FileNotFoundError("Taxonomy artifact must be uploaded!")

		# Optional metadata
		if("metadata" in request.files):
			metadata = request.files["metadata"]
		elif("metadata" in request.form):
			metadata = request.form["metadata"]
		else:
			metadata = None

		taxa_level = request.form["Taxa collapse level"]
		sort_level = request.form["Sort level"]
		keyword_filter = request.form["Keyword filter"] if request.form["Keyword filter"] else None
		fill_variable = request.form["Fill variable"] if (request.form["Fill variable"] and metadata is not None) else None
		abundance_threshold = request.form["Abundance threshold"]
		alpha = request.form["alpha"]
		stroke = request.form["stroke"]
		palette = request.form["Colour set"]
		brewer_type = request.form["brewer type"]
		width = request.form["Width"]
		height = request.form["Height"]

		feature_table_path, taxonomy_path, metadata_path = extension_helper.validate_bubbleplot_input(
			_id=_id,
			feature_table_artifact_path=feature_table_qza,
			taxonomy_artifact_path=taxonomy_qza,
			metadata_path=metadata,
			fill_variable=fill_variable
		)

		extension_helper.bubbleplot_setup(_id)

		bubbleplot_kwargs = {
			'feature_table_artifact_path': feature_table_path,
			'taxonomy_artifact_path': taxonomy_path,
			'metadata_path': metadata_path,
			'level': taxa_level,
			'groupby_taxa': sort_level,
			'abundance_threshold': float(abundance_threshold),
			'keyword': keyword_filter,
			'fill_variable': fill_variable,
			'brewer_type': brewer_type,
			'palette': palette,
			'alpha': float(alpha),
			'stroke': float(stroke),
			'width': float(width),
			'height': float(height)
		}
		bubbleplot_task.apply_async(
			args=[_id, task_type, URL, task_progress_file],
			kwargs=bubbleplot_kwargs,
			task_id=_id,
		)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')

@blueprint.route("/triplot", methods=['POST'])
def triplot():
	# Use UUID4 for unique identifier
	_id = str(request.form['uuid'])
	URL = current_app.config["CELERY_BROKER_URL"]

	task_type = str(request.form['formType'])

	# path to file to record task progress
	# It will be used to retrieve working progress
	# Maybe replace it with database later
	task_progress_file = os.path.join('/output', _id, 'task_progress.txt')

	try:
		# Check if the upload is made from the client or server
		if("feature_table" in request.files):
			feature_table_qza = request.files["feature_table"]
		elif("feature_table" in request.form):
			feature_table_qza = request.form["feature_table"]
		else:
			raise FileNotFoundError("Feature table must be uploaded!")

		if("taxonomy_qza" in request.files):
			taxonomy_qza = request.files["taxonomy_qza"]
		elif("taxonomy_qza" in request.form):
			taxonomy_qza = request.form["taxonomy_qza"]
		else:
			raise FileNotFoundError("Taxonomy artifact must be uploaded!")

		if("metadata" in request.files):
			metadata = request.files["metadata"]
		elif("metadata" in request.form):
			metadata = request.form["metadata"]
		else:
			raise FileNotFoundError("Sample metadata must be uploaded!")

		if("environmental_metadata" in request.files):
			environmental_metadata = request.files["environmental_metadata"]
		elif("environmental_metadata" in request.form):
			environmental_metadata = request.form["environmental_metadata"]
		else:
			raise FileNotFoundError("Environmental metadata must be uploaded!")

		ordination_collapse_level = request.form["Ordination collapse level"]
		weighted_average_collapse_level = request.form["Taxa weights collapse level"]
		dissmilarity_index = request.form["Dissmilarity index"]
		R2_threshold = request.form["R squared threshold"]
		wa_threshold = request.form["Taxa weighted average threshold"]
		pval_threshold = request.form["p-value threshold"]
		
		fill_variable = request.form["Fill variable"]
		# Fill variable must exist
		if not(fill_variable):
			return Response("Please specify fill variable!", status=400, mimetype='text/html')
		fill_variable_dtype = request.form["Fill variable data type"]
		colour_set = request.form["Colour set"]
		brewer_type = request.form["brewer type"]

		sampling_depth = request.form["Rarefaction depth"]
		alpha = request.form["alpha"]
		stroke = request.form["stroke"]
		point_size = request.form["point size"]
		PC_axis_1 = request.form["PC axis 1"]
		PC_axis_2 = request.form["PC axis 2"]
		width = request.form["Width"]
		height = request.form["Height"]
		x_axis_text_size = request.form["x axis label size"]
		y_axis_text_size = request.form["y axis label size"]
		taxa_text_size = request.form["taxa bubble text size"]
		vector_arrow_text_size = request.form["vector arrow text size"]
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
			'ordination_collapse_level': ordination_collapse_level,
			'sampling_depth': int(sampling_depth),
			'wascores_collapse_level': weighted_average_collapse_level,
			'dissmilarity_index': dissmilarity_index,
			'R2_threshold': float(R2_threshold),
			'wa_threshold': float(wa_threshold),
			'pval_threshold': float(pval_threshold),
			'fill_variable': fill_variable,
			'fill_variable_dtype': fill_variable_dtype,
			'colour_set': colour_set,
			'brewer_type': brewer_type,
			'alpha': float(alpha),
			'stroke': float(stroke),
			'point_size': float(point_size),
			'PC_axis_one': int(PC_axis_1),
			'PC_axis_two': int(PC_axis_2),
			'width': float(width),
			'height': float(height),
			'x_axis_text_size': x_axis_text_size,
			'y_axis_text_size': y_axis_text_size,
			'legend_title_size': legend_title_size,
			'legend_text_size': legend_text_size,
			'taxa_text_size': taxa_text_size,
			'vector_arrow_text_size': vector_arrow_text_size
		}
		triplot_task.apply_async(
			args=[_id, task_type, URL, task_progress_file],
			kwargs=triplot_kwargs,
			task_id=_id,
		)

	except AXIOME3Error as err:
		current_app.logger.error(str(err))
		return err.response

	except FileNotFoundError as err:
		current_app.logger.error(str(err))
		return Response(str(err), status=400, mimetype='text/html')

	except Exception as err:
		current_app.logger.error(str(err))
		return Response("Internal Server Error", status=500, mimetype='text/html')

	return Response("Success!", status=200, mimetype='text/html')