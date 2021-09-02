from flask import Blueprint, request, send_file, Response
import os
import zipfile
import io

from AXIOME3_app.utils import get_input_upload_dir

blueprint = Blueprint("version_info", __name__, url_prefix="/version_info")

@blueprint.route("/", methods=['POST'])
def version_info():
	uid = request.form["uid"]
	mb = 1000 * 1000
	limit = 300 * mb

	OUTPUT_DIR = os.path.join('output', uid)
	if(uid == ''):
		# return sample output if uid not specified
		version_info_file = os.path.join('/data/output/', 'paired_end_demux.qza')
	else:
		version_info_file = os.path.join(OUTPUT_DIR, 'version_info.txt')

	if(os.stat(qza_file).st_size >= limit):
		return Response("File is too big", status=500, mimetype='text/html')

	return send_file(version_info_file, mimetype='text/plain', as_attachment=True)