from AXIOME3_app.tasks.pipeline import dummy_task
from filebrowse import filetree_generator
from flask import Blueprint, request, jsonify
import json

# For console debugging
import sys

blueprint = Blueprint("datahandle", __name__, url_prefix="/datahandle")

def on_raw_message(body):
	print(body, file=sys.stderr)

@blueprint.route("/", methods=['POST'])
def generate_files():
	if request.method == 'POST':
		form_type = request.form['formType']

		#if(form_type == "InputUpload"):
			# 1. Edit configuration file for luigi
			# 2. Add task to a Celery queue
			# 3. return
		result = dummy_task.apply_async()

		print(result.get(on_message=on_raw_message, propagate=False))

		return result.get()
