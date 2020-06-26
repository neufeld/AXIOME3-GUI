from flask import Blueprint, request, send_file
import os
import zipfile
import io

blueprint = Blueprint("batch", __name__, url_prefix="/batch")

@blueprint.route("/zip", methods=['POST'])
def download_all():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		output_dir = os.path.join('/data/output/')
	else:
		output_dir = os.path.join('/output', uid)

	memory_file = io.BytesIO()
	with zipfile.ZipFile(memory_file, 'w') as zf:			
		for root, dirs, files in os.walk(output_dir):
			for f in files:
				zf.write(os.path.join(root, f))

	memory_file.seek(0)

	return send_file(memory_file, mimetype='application/zip', attachment_filename="output.zip",as_attachment=True)