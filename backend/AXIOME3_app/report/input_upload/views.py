from flask import Blueprint, request, send_file, Response
import os
import zipfile
import io

from AXIOME3_app.utils import get_input_upload_dir

blueprint = Blueprint("input_upload", __name__, url_prefix="/input_upload")

@blueprint.route("/qza", methods=['POST'])
def input_upload_qza():
	uid = request.form["uid"] # this will be the id of the folder created in output (id of the run)
	mb = 1000 * 1000
	limit = 300 * mb

	INPUT_UPLOAD_DIR = get_input_upload_dir(uid)
	if(uid == ''):
		# return sample output if uid not specified
		qza_file = os.path.join('/data/output/', 'paired_end_demux.qza')
	else:
		qza_file = os.path.join(INPUT_UPLOAD_DIR, 'paired_end_demux.qza')

	if(os.stat(qza_file).st_size >= limit):
		return Response("File is too big", status=500, mimetype='text/html')

	return send_file(qza_file, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/qzv", methods=['POST'])
def input_upload_qzv():
	uid = request.form["uid"]
	INPUT_UPLOAD_DIR = get_input_upload_dir(uid)

	if(uid == ''):
		# return sample output if uid not specified
		qzv_file = os.path.join('/data/output/', 'paired_end_demux.qzv')
	else:
		qzv_file = os.path.join(INPUT_UPLOAD_DIR, 'paired_end_demux.qzv')

	return send_file(qzv_file, mimetype='application/octet-stream', as_attachment=True)