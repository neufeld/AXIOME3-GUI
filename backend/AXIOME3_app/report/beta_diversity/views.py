from flask import Blueprint, request, send_file
import os

blueprint = Blueprint("beta_diversity", __name__, url_prefix="/beta_diversity")

@blueprint.route("/qza", methods=['GET', 'POST'])
def beta_diversity_qza():
	uid = request.form["uid"]
	metric = request.form["beta_diversity"]

	extension = ".qza"
	if(uid == ''):
		# sample output
		beta_diversity_file = os.path.join('/data/output/post_analysis/core_div_phylogeny', metric + extension) # TEMP
	else:
		beta_diversity_file = os.path.join('/output', uid, 'post_analysis', 'core_div_phylogeny', metric + extension)	


	return send_file(beta_diversity_file, mimetype='application/octet-stream', as_attachment=True)