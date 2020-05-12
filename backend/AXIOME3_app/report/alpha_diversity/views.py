from flask import Blueprint, request, send_file
import os

blueprint = Blueprint("alpha_diversity", __name__, url_prefix="/alpha_diversity")

@blueprint.route("/qza", methods=['GET', 'POST'])
def alpha_diversity_qza():
	uid = request.form["uid"]
	metric = request.form["alpha_diversity"]

	extension = ".qza"
	# Absolute path to the metadata column json file
	alpha_diversity_file = os.path.join('/data/output/post_analysis/core_div_phylogeny', metric + extension) # TEMP
	#collapsed_taxa = os.path.join('/output', uid, 'post_analysis', 'core_div_phylogeny', metric + extension)	

	return send_file(alpha_diversity_file, mimetype='application/octet-stream', as_attachment=True)