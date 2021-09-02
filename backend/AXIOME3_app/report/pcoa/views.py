from flask import Blueprint, request, send_file
import sys
import os
import io

from AXIOME3_app.utils import get_pcoa_plots_dir

blueprint = Blueprint("pcoa", __name__, url_prefix="/pcoa")

@blueprint.route("/columns", methods=['POST'])
def pcoa_columns():
	uid = request.form["uid"]
	PCOA_DIR = get_pcoa_plots_dir(uid)

	if(uid == ''):
		# sample output
		json_file = os.path.join('/data/output/post_analysis/pcoa_plots/', 'pcoa_columns.json') # TEMP
	else:
		json_file = os.path.join(PCOA_DIR, 'pcoa_columns.json')

	return send_file(json_file, mimetype='application/json')

@blueprint.route("/jpeg", methods=['POST'])
def pcoa_jpeg():
	uid = request.form["uid"]
	distance_type = request.form["distance"]
	file_name = request.form["column"]
	PCOA_DIR = get_pcoa_plots_dir(uid)

	if(uid == ''):
		# sample output
		pcoa_plot = os.path.join('/data/output/post_analysis/pcoa_plots/', distance_type, file_name)
	else:
		pcoa_plot = os.path.join(PCOA_DIR, distance_type, file_name)

	with open(pcoa_plot, 'rb') as bytes_obj:
		return send_file(
			io.BytesIO(bytes_obj.read()),
			as_attachment=True,
			attachment_filename=distance_type+"_"+file_name,
			mimetype='image/jpeg'
		)

@blueprint.route("/pdf", methods=['POST'])
def pcoa_pdf():
	uid = request.form["uid"]
	distance_type = request.form["distance"]
	PCOA_DIR = get_pcoa_plots_dir(uid)

	if(uid == ''):
		# sample output
		pdf_file = os.path.join('/data/output/post_analysis/pcoa_plots/', distance_type + '_pcoa_plots.pdf')
	else:
		pdf_file = os.path.join(PCOA_DIR, distance_type + '_pcoa_plots.pdf')

	return send_file(pdf_file, mimetype='application/octet-stream', as_attachment=True)