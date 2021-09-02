from flask import Blueprint, request, send_file
import sys
import os

from AXIOME3_app.utils import get_taxonomic_classification_dir

blueprint = Blueprint("taxonomy", __name__, url_prefix="/taxonomy")

@blueprint.route("/collapse/tsv", methods=['GET', 'POST'])
def taxa_collapse_tsv():
	uid = request.form["uid"]
	taxa = request.form["taxa"]
	TAXONOMIC_CLASSIFICATION_DIR = get_taxonomic_classification_dir(uid)

	extension = ".tsv"
	if(uid == ''):
		# sample output
		collapsed_taxa = os.path.join('/data/output/taxa_collapse/', taxa + '_collapsed_table' + extension)
	else:
		collapsed_taxa = os.path.join(TAXONOMIC_CLASSIFICATION_DIR, taxa + '_collapsed_table' + extension)	

	return send_file(collapsed_taxa, mimetype='text/tab-separated-values', as_attachment=True)

@blueprint.route("/collapse/qza", methods=['GET', 'POST'])
def taxa_collapse_qza():
	uid = request.form["uid"]
	taxa = request.form["taxa"]
	TAXONOMIC_CLASSIFICATION_DIR = get_taxonomic_classification_dir(uid)

	extension = ".qza"
	if(uid == ''):
		# sample output
		collapsed_taxa = os.path.join('/data/output/taxa_collapse/', taxa + '_collapsed_table' + extension)
	else:
		collapsed_taxa = os.path.join(TAXONOMIC_CLASSIFICATION_DIR, taxa + '_collapsed_table' + extension)	

	return send_file(collapsed_taxa, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/asv/tsv", methods=['GET', 'POST'])
def taxa_asv_tsv():
	uid = request.form["uid"]
	TAXONOMIC_CLASSIFICATION_DIR = get_taxonomic_classification_dir(uid)

	extension = ".tsv"
	if(uid == ''):
		# sample output
		asv_taxa = os.path.join('/data/output/exported/', "taxonomy" + extension)
	else:
		asv_taxa = os.path.join(TAXONOMIC_CLASSIFICATION_DIR, "taxonomy" + extension)	

	return send_file(asv_taxa, mimetype='text/tab-separated-values', as_attachment=True)

@blueprint.route("/asv/qza", methods=['GET', 'POST'])
def taxa_asv_qza():
	uid = request.form["uid"]
	TAXONOMIC_CLASSIFICATION_DIR = get_taxonomic_classification_dir(uid)

	extension = ".qza"
	if(uid == ''):
		# sample output
		asv_taxa = os.path.join('/data/output/taxonomy/', "taxonomy" + extension)
	else:
		asv_taxa = os.path.join(TAXONOMIC_CLASSIFICATION_DIR, "taxonomy" + extension)	

	return send_file(asv_taxa, mimetype='application/octet-stream', as_attachment=True)