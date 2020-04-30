from flask import Blueprint, request, Response, current_app
import uuid
import os
#from werkzeug import secure_filename
# For console debugging
import sys

# Custom modules
from AXIOME3_app.datahandle import luigi_prep_helper
from AXIOME3_app.datahandle import config_generator

# Celery task
from AXIOME3_app.tasks.input_upload import import_data_task
from AXIOME3_app.tasks.denoise import denoise_task
from AXIOME3_app.tasks.analysis import analysis_task
from AXIOME3_app.tasks.pipeline import check_output_task

# Custom Exceptions
from AXIOME3_app.exceptions.exception import CustomError

blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

@blueprint.route("/", methods=['POST'])
def generate_files():
	form_type = request.form['formType']

	# Use UUID4 for unique identifier
	_id = str(uuid.uuid4())
	URL = current_app.config["CELERY_BROKER_URL"]

	try:
		if(form_type == "InputUpload"):
			# Check if the upload is made from the client or server
			if("manifest" in request.files):
				manifest_file = request.files["manifest"]
			else:
				manifest_file = request.form["manifest"]
			
			input_format = request.form["Input Format"]
			sample_type = request.form["Sample Type"]

			# Do preliminary checks on manifest file
			manifest_path = luigi_prep_helper.input_upload_precheck(
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

			import_data_task.apply_async(args=[_id, URL], link=check_output_task.s(URL, form_type))

		elif(form_type == "Denoise"):
			# Check if the upload is made from the client or server
			if("demultiplexed" in request.files):
				imported_qza = request.files["demultiplexed"]
			else:
				imported_qza = request.form["demultiplexed"]			
			trunc_len_f = request.form["trunc-len-f"]
			trunc_len_r = request.form["trunc-len-r"]
			trim_left_f = request.form["trim-left-f"]
			trim_left_r = request.form["trim-left-r"]

			denoise_input_path = luigi_prep_helper.denoise_precheck(
				_id=_id,
				input_file=imported_qza
			)

			# Prepare necessary files for denoise
			log_config_path = luigi_prep_helper.pipeline_setup(_id)
			luigi_prep_helper.luigi_config_generator(
				_id=_id,
				log_config_path=log_config_path,
				trim_left_f=trim_left_f,
				trunc_len_f=trunc_len_f,
				trim_left_r=trim_left_r,
				trunc_len_r=trunc_len_r
			)

			# Copy input file to premade output dir
			luigi_prep_helper.denoise_setup(denoise_input_path, _id)

			denoise_task.apply_async(args=[_id, URL], link=check_output_task.s(URL, form_type))

		elif(form_type == "Analysis"):
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

			feature_table_path, rep_seqs_path, metadata_path = luigi_prep_helper.analysis_precheck(
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
			luigi_prep_helper.analysis_setup(_id, feature_table_path, rep_seqs_path)

			analysis_task.apply_async(args=[_id, URL], link=check_output_task.s(URL, form_type))

			return Response(_id, status=200, mimetype='text/html')

	except CustomError as err:
		return err.response

	return Response(form_type, status=200, mimetype='text/html')