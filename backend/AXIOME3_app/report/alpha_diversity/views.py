from flask import Blueprint, request, send_file
import os

from AXIOME3_app.utils import get_metrics_dir

blueprint = Blueprint("alpha_diversity", __name__, url_prefix="/alpha_diversity")

@blueprint.route("/qza", methods=['GET', 'POST'])
def alpha_diversity_qza():
	uid = request.form["uid"]
	metric = request.form["alpha_diversity"]
	METRICS_DIR = get_metrics_dir(uid)

	extension = ".qza"
	if(uid == ''):
		# sample output
		alpha_diversity_file = os.path.join('/data/output/post_analysis/core_div_phylogeny', metric + extension) # TEMP
	else:
		alpha_diversity_file = os.path.join(METRICS_DIR, metric + extension)	

	return send_file(alpha_diversity_file, mimetype='application/octet-stream', as_attachment=True)