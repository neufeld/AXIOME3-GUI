from AXIOME3_app.extensions import celery
import luigi
#import pipeline # AXIOME3 Pipeline; its path shouldve been added
import os
import subprocess
import sys

from flask_socketio import SocketIO

@celery.task(name="pipeline.run.import")
def import_data_task(_id, URL):
	# Path to configuration file to be used
	#config_path = "/pipeline/AXIOME3/configuration/luigi.cfg"
	#luigi.configuration.add_config_path(config_path)

	# Reload pipeline to apply new config setting?
	#importlib.invalidate_caches()
	#importlib.reload(pipeline)

	local_socketio = SocketIO(message_queue=URL)
	local_socketio.emit(
		'test',
		{'data': 'Running import data!'},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Summarize", "--local-scheduler"]
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	#isSuccess = luigi.build([pipeline.Import_Data()], local_scheduler=True)

	return _id