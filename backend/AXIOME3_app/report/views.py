from flask import Blueprint, request, send_file
import sys
import os
import io

blueprint = Blueprint("report", __name__, url_prefix="/report")

@blueprint.route("/", methods=['GET', 'POST'])
def download_file():
	uid = request.form["uid"]

	f = os.path.join('/backend', 'server.py')
	qzv = os.path.join('/backend/AXIOME3_app/report', 'paired_end_demux.qzv')
	large_f = os.path.join('/backend/AXIOME3_app/report', 'tmp')

	return send_file(qzv, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/taxa_collapse/tsv", methods=['GET', 'POST'])
def taxa_collapse_tsv():
	uid = request.form["uid"]
	taxa = request.form["taxa"]

	extension = ".tsv"
	# Absolute path to the metadata column json file
	collapsed_taxa = os.path.join('/data/output/taxa_collapse/', taxa + '_collapsed_table' + extension) # TEMP
	#collapsed_taxa = os.path.join('/output', uid, 'taxa_collapse', taxa + '_collapsed_table' + extension)	

	return send_file(collapsed_taxa, mimetype='text/tab-separated-values', as_attachment=True)

@blueprint.route("/taxa_collapse/qza", methods=['GET', 'POST'])
def taxa_collapse_qza():
	uid = request.form["uid"]
	taxa = request.form["taxa"]

	extension = ".qza"
	# Absolute path to the metadata column json file
	collapsed_taxa = os.path.join('/data/output/taxa_collapse/', taxa + '_collapsed_table' + extension) # TEMP
	#collapsed_taxa = os.path.join('/output', uid, 'taxa_collapse', taxa + '_collapsed_table' + extension)	

	return send_file(collapsed_taxa, mimetype='text/tab-separated-values', as_attachment=True)