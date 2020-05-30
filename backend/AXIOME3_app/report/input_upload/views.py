from flask import Blueprint, request, send_file
import os

blueprint = Blueprint("input_upload", __name__, url_prefix="/input_upload")

@blueprint.route("/qza", methods=['POST'])
def input_upload_qza():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		qza_file = os.path.join('/data/output/', 'paired_end_demux.qza')
	else:
		qza_file = os.path.join('/output', uid, 'paired_end_demux.qza')

	return send_file(qza_file, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/qzv", methods=['POST'])
def input_upload_qzv():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		qzv_file = os.path.join('/data/output/', 'paired_end_demux.qzv')
	else:
		qzv_file = os.path.join('/output', uid, 'paired_end_demux.qzv')

	return send_file(qzv_file, mimetype='application/octet-stream', as_attachment=True)