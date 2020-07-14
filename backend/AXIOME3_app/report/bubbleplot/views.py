from flask import Blueprint, request, send_file
import os
import io

blueprint = Blueprint("bubbleplot", __name__, url_prefix="/bubbleplot")

@blueprint.route("/png", methods=['POST'])
def bubbleplot_png():
	uid = request.form["uid"]

	if(uid == ''): # TEMPORARY
		bubbleplot = os.path.join('/data/output/plot.png')
	else:
		bubbleplot = os.path.join('/output', uid, 'plot.png')

	with open(bubbleplot, 'rb') as bytes_obj:
		return send_file(
			io.BytesIO(bytes_obj.read()),
			as_attachment=True,
			attachment_filename='pcoa.png',
			mimetype='image/png'
		)

@blueprint.route("/pdf", methods=['POST'])
def bubbleplot_pdf():
	uid = request.form["uid"]

	if(uid == ''):
		bubbleplot = os.path.join('/data/output/plot.pdf')
	else:
		bubbleplot = os.path.join('/output', uid, 'plot.pdf')

	return send_file(bubbleplot, mimetype='application/octet-stream', as_attachment=True)