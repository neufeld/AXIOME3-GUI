from flask import Blueprint, request, send_file
import os

blueprint = Blueprint("denoise", __name__, url_prefix="/denoise")

@blueprint.route("/feature_table", methods=['POST'])
def denoise_feature_table():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		feature_table = os.path.join('/data/output/dada2/merged', 'merged_table.qza')
	else:
		feature_table = os.path.join('/output', uid, 'dada2', 'merged', 'merged_table.qza')

	return send_file(feature_table, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/representative_sequences", methods=['POST'])
def denoise_rep_seqs():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		rep_seqs = os.path.join('/data/output/dada2/merged', 'merged_rep_seqs.qza')
	else:
		rep_seqs = os.path.join('/output', uid, 'dada2', 'merged', 'merged_rep_seqs.qza')

	return send_file(rep_seqs, mimetype='application/octet-stream', as_attachment=True)

@blueprint.route("/sample_summary/json", methods=['POST'])
def denoise_sample_summary():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		sample_summary = os.path.join('/data/output/dada2/', 'sample_counts.json')
	else:
		sample_summary = os.path.join('/output', uid, 'dada2', 'sample_counts.json')

	return send_file(sample_summary, mimetype='application/json', as_attachment=True)

@blueprint.route("/summary_qzv", methods=['POST'])
def denoise_summary_qzv():
	uid = request.form["uid"]

	if(uid == ''):
		# return sample output if uid not specified
		feature_table = os.path.join('/data/output/dada2/merged', 'merged_table.qza')
	else:
		feature_table = os.path.join('/output', uid, 'dada2', 'merged', 'merged_table.qza')

	return send_file(feature_table, mimetype='application/octet-stream', as_attachment=True)