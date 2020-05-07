from flask import Blueprint, request, Response
import os

blueprint = Blueprint("session_retrieve", __name__, url_prefix="/session_retrieve")

@blueprint.route("/", methods=['POST'])
def retrieve_status():
	session_id = request.form["session_id"]

	task_status_file = os.path.join('/output', session_id, 'task_progress.txt')

	if not(os.path.exists(task_status_file)):
		return Response("Requested sesssion does NOT exist...", status=400, mimetype='text/html')

	with open(task_status_file, 'r') as fh:
		task_status_list = fh.readlines()

		task_status = ''.join(task_status_list)

		return Response(task_status, status=200, mimetype='text/html')