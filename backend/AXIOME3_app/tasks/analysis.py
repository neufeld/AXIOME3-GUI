from AXIOME3_app.extensions import celery
import subprocess

from flask_socketio import SocketIO

@celery.task(name="pipeline.run.denoise")
def analysis_task(_id, URL):
	local_socketio = SocketIO(message_queue=URL)
	local_socketio.emit(
		'test',
		{'data': 'Performing Taxonomic Classification...'},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Export_Taxa_Collapse", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	local_socketio.emit(
		'test',
		{'data': 'Generating ASV Table...'},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Generate_Combined_Feature_Table", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	local_socketio.emit(
		'test',
		{'data': 'Analyzing samples...'},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "PCoA_Plots", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "PCoA_Plots_jpeg", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	return _id