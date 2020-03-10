from flask import Blueprint, request, Response
import uuid
import os
#from werkzeug import secure_filename
# For console debugging
import sys

# Custom modules
from AXIOME3_app.datahandle import luigi_prep_helper
from AXIOME3_app.datahandle import config_generator

# Celery task
from AXIOME3_app.tasks.pipeline import dummy_task

# Custom Exceptions
from AXIOME3_app.exceptions.exception import CustomError


blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

@blueprint.route("/", methods=['POST'])
def generate_files():
	form_type = request.form['formType']

	# Use UUID4 for unique identifier
	_id = str(uuid.uuid4())

	try:
		if(form_type == "InputUpload"):
			# Do preliminary checks
			manifest_path = luigi_prep_helper.input_upload_pre_check(_id=_id, request=request)
			log_config_path = luigi_prep_helper.pipeline_setup(_id)
			luigi_prep_helper.input_upload(manifest_path, _id, log_config_path)

	except CustomError as err:
		# TODO: remove output and log dir for failed request?
		return err.response

	dummy_task.apply_async()

	return Response("ok", status=200, mimetype='text/html')