from flask import Blueprint, request, send_file
import sys
import os
import io
from PIL import Image

blueprint = Blueprint("report", __name__, url_prefix="/report")

@blueprint.route("/", methods=['GET', 'POST'])
def download_file():
	uid = request.form["uid"]

	f = os.path.join('/backend', 'server.py')
	qzv = os.path.join('/backend/AXIOME3_app/report', 'paired_end_demux.qzv')
	large_f = os.path.join('/backend/AXIOME3_app/report', 'tmp')

	return send_file(qzv, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/pcoa/columns", methods=['POST'])
def pcoa_columns():
	uid = request.form["uid"]

	# Absolute path to the metadata column json file
	json_file = os.path.join('/data/output/post_analysis/pcoa_plots/', 'pcoa_columns.json') # TEMP
	#json_file = os.path.join('/output', uid, 'post_analysis', 'pcoa_plots', 'pcoa_columns.json')

	return send_file(json_file, mimetype='application/json')

@blueprint.route("/pcoa", methods=['POST'])
def pcoa_jpeg():
	uid = request.form["uid"]
	distance_type = request.form["distance"]
	file_name = request.form["column"]

	# Absolute path to requested PCoA plot
	pcoa_plot = os.path.join('/data/output/post_analysis/pcoa_plots/', distance_type, file_name)
	#pcoa_plot = os.path.join('/output', uid, 'post_analysis', 'pcoa_plots', 'pcoa_columns.json')


	#image_data = Image.open(pcoa_plot)
	#bytes_object = io.BytesIO()
	#image_data.save(bytes_object, 'JPEG')
	#bytes_object.seek(0)

	#return send_file(bytes_object, mimetype='image/jpeg')

	with open(pcoa_plot, 'rb') as bytes_obj:
		return send_file(
			io.BytesIO(bytes_obj.read()),
			as_attachment=True,
			attachment_filename=distance_type+"_"+file_name,
			mimetype='image/jpeg'
		)