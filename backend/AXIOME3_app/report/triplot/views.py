from flask import Blueprint, request, send_file
import os
import io

blueprint = Blueprint("triplot", __name__, url_prefix="/triplot")

@blueprint.route("/png", methods=['POST'])
def triplot_png():
	uid = request.form["uid"]

	if(uid == ''): # TEMPORARY
		triplot = os.path.join('/data/output/plot.png')
	else:
		triplot = os.path.join('/output', uid, 'plot.png')

	with open(triplot, 'rb') as bytes_obj:
		return send_file(
			io.BytesIO(bytes_obj.read()),
			as_attachment=True,
			attachment_filename='triplot.png',
			mimetype='image/png'
		)

@blueprint.route("/pdf", methods=['POST'])
def triplot_pdf():
	uid = request.form["uid"]

	if(uid == ''):
		triplot = os.path.join('/data/output/plot.pdf')
	else:
		triplot = os.path.join('/output', uid, 'plot.pdf')

	return send_file(triplot, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/env_summary", methods=['POST'])
def triplot_env_summary():
	uid = request.form["uid"]

	if(uid == ''):
		return
	else:
		summary_file = os.path.join('/output', uid, 'vector_arrow_summary.csv')

	return send_file(summary_file, mimetype='text/csv', as_attachment=True)

@blueprint.route("/sample_summary", methods=['POST'])
def triplot_sample_summary():
	uid = request.form["uid"]

	if(uid == ''):
		return
	else:
		summary_file = os.path.join('/output', uid, 'sample_summary.csv')

	return send_file(summary_file, mimetype='text/csv', as_attachment=True)