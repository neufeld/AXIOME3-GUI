from filebrowse import filebrowse_app, filetree_generator
from flask import Blueprint, Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import json

# For console debugging
import sys

filebrowse_bp = Blueprint('filebrowse_bp', __name__)

@filebrowse_bp.route('/filebrowse', methods=['GET', 'POST'])
def generate_files():
	if request.method == 'POST':
		# Generate file tree
		file_obj = filetree_generator.getFileTree(request.json['path'])

		# Sort the file tree
		sorted_file_obj = filetree_generator.sortFileTree(file_obj)

		return json.dumps(sorted_file_obj)
	return "This is file browse endpoint!"

