from flask import Blueprint, send_file
import os

blueprint = Blueprint("report", __name__, url_prefix="/report")

@blueprint.route("/", methods=['GET', 'POST'])
def download_file():
	f = os.path.join('/backend', 'server.py')
	qza = os.path.join('/backend/AXIOME3_app/report', 'paired_end_demux.qzv')
	large_f = os.path.join('/backend/AXIOME3_app/report', 'tmp')
	return send_file(qza, mimetype='application/octet-stream', as_attachment=True)