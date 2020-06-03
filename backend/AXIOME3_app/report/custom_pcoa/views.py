from flask import Blueprint, request, send_file
import sys
import os
import io

blueprint = Blueprint("custom_pcoa", __name__, url_prefix="/custompcoa")

@blueprint.route("/png", methods=['POST'])
def custom_pcoa_png():
	uid = request.form["uid"]

	if(uid == ''): # TEMPORARY
		pcoa_plot = os.path.join('/data/output/plot.png')
	else:
		pcoa_plot = os.path.join('/output', uid, 'plot.png')

	with open(pcoa_plot, 'rb') as bytes_obj:
		return send_file(
			io.BytesIO(bytes_obj.read()),
			as_attachment=True,
			attachment_filename='pcoa.png',
			mimetype='image/png'
		)

@blueprint.route("/pdf", methods=['POST'])
def custom_pcoa_pdf():
	uid = request.form["uid"]

	if(uid == ''):
		pcoa_plot = os.path.join('/data/output/plot.pdf')
	else:
		pcoa_plot = os.path.join('/output', uid, 'plot.pdf')

	return send_file(pcoa_plot, mimetype='application/octet-stream', as_attachment=True)