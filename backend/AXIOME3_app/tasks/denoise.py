from AXIOME3_app.extensions import celery
import subprocess

from flask_socketio import SocketIO

@celery.task(name="pipeline.run.denoise")
def denoise_task(_id, URL):
	local_socketio = SocketIO(message_queue=URL)
	local_socketio.emit(
		'test',
		{'data': 'Running denoise!'},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Sample_Count_Summary", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	#isSuccess = luigi.build([pipeline.Import_Data()], local_scheduler=True)

	return _id