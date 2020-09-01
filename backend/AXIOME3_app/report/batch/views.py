from flask import Blueprint, request, send_file, Response
import os
import zipfile
import io

blueprint = Blueprint("batch", __name__, url_prefix="/batch")

def get_size(start_path = '.'):
	total_size = 0
	for dirpath, dirnames, filenames in os.walk(start_path):
		for f in filenames:
			fp = os.path.join(dirpath, f)
			# skip if it is symbolic link
			if not os.path.islink(fp):
				total_size += os.path.getsize(fp)

	return total_size

@blueprint.route("/zip", methods=['POST'])
def download_all():
	uid = request.form["uid"]
	mb = 1000 * 1000
	limit = 200 * mb

	if(uid == ''):
		# return sample output if uid not specified
		output_dir = os.path.join('/data/output/')
	else:
		output_dir = os.path.join('/output', uid)

	#dir_size = get_size(output_dir)
	#if(dir_size >= limit):
	#	return Response("File is too big", status=500, mimetype='text/html')

	memory_file = io.BytesIO()
	with zipfile.ZipFile(memory_file, 'w') as zf:			
		for root, dirs, files in os.walk(output_dir):
			for f in files:
				fpath = os.path.join(root, f)
				if(os.stat(fpath).st_size < limit):
					zf.write(fpath)

	memory_file.seek(0)

	return send_file(memory_file, mimetype='application/zip', attachment_filename="output.zip",as_attachment=True)