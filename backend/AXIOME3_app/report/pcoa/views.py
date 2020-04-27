from flask import Blueprint, request, send_file
import sys
import os
import io

blueprint = Blueprint("pcoa", __name__, url_prefix="/pcoa")

@blueprint.route("/columns", methods=['POST'])
def pcoa_columns():
	uid = request.form["uid"]

	# Absolute path to the metadata column json file
	json_file = os.path.join('/data/output/post_analysis/pcoa_plots/', 'pcoa_columns.json') # TEMP
	#json_file = os.path.join('/output', uid, 'post_analysis', 'pcoa_plots', 'pcoa_columns.json')

	return send_file(json_file, mimetype='application/json')

@blueprint.route("/jpeg", methods=['POST'])
def pcoa_jpeg():
	uid = request.form["uid"]
	distance_type = request.form["distance"]
	file_name = request.form["column"]

	# Absolute path to requested PCoA plot
	pcoa_plot = os.path.join('/data/output/post_analysis/pcoa_plots/', distance_type, file_name)
	#pcoa_plot = os.path.join('/output', uid, 'post_analysis', 'pcoa_plots', 'pcoa_columns.json')

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

	# Absolute path to the metadata column json file
	pdf_file = os.path.join('/data/output/post_analysis/pcoa_plots/', distance_type + '_pcoa_plots.pdf') # TEMP
	#pdf_file = os.path.join('/output', uid, 'post_analysis', 'pcoa_plots', 'pcoa_columns.json')

	return send_file(pdf_file, mimetype='application/octet-stream', as_attachment=True)