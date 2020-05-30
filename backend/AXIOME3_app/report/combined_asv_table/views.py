from flask import Blueprint, request, send_file
import os

blueprint = Blueprint("combined_asv_table", __name__, url_prefix="/combined_asv_table")

@blueprint.route("/tsv", methods=['POST'])
def combined_table_tsv():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		combined_table = os.path.join('/data/output/exported', 'ASV_table_combined.tsv')
	else:
		combined_table = os.path.join('/output', uid, 'exported', 'ASV_table_combined.tsv')

	return send_file(combined_table, mimetype='text/tab-separated-values', as_attachment=True)