from filebrowse import filebrowse_app, filetree_generator
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import json

# For console debugging
import sys

filebrowse_bp = Blueprint('filebrowse_bp', __name__)

@filebrowse_bp.route('/filebrowse', methods=['GET', 'POST'])
def generate_files():
	if request.method == 'POST':
		# Generate file tree (list of dict)
		file_list = filetree_generator.getFileTree(request.json['path'])

		# Sort the file tree
		sorted_file_list = filetree_generator.sortFileTree(file_list)

		return jsonify(files=sorted_file_list)
	return "This is file browse endpoint!"

