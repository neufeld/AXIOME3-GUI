from filebrowse import filebrowse_app, filetree_generator
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import json

# For console debugging
import sys

data_handle_bp = Blueprint('data_handle_bp', __name__)

@data_handle_bp.route('/submit', methods=['POST'])
def generate_files():
	if request.method == 'POST':
		form_type = request.form['formType']

		#if(form_type == "InputUpload"):
			# 1. Edit configuration file for luigi
			# 2. Add task to a Celery queue
			# 3. return

		return "success!"
