from filebrowse import filetree_generator
from flask import Blueprint, request, jsonify
import json

# For console debugging
import sys

blueprint = Blueprint("filebrowse", __name__, url_prefix="/filebrowse")

@blueprint.route("/", methods=['GET', 'POST'])
def generate_files():
	if request.method == 'POST':
		# Generate file tree (list of dict)
		file_list = filetree_generator.getFileTree(request.json['path'])

		# Sort the file tree
		sorted_file_list = filetree_generator.sortFileTree(file_list)

		return jsonify(files=sorted_file_list)
	return "This is file browse endpoint!"

