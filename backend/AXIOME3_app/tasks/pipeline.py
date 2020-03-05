from AXIOME3_app.extensions import celery
import luigi
#import pipeline # AXIOME3 Pipeline; its path shouldve been added
import importlib
import shutil
import os
import sys
import subprocess

@celery.task(name="pipeline.run.import")
def dummy_task():
	# Path to configuration file to be used
	#config_path = "/pipeline/AXIOME3/configuration/luigi.cfg"
	#luigi.configuration.add_config_path(config_path)

	# Reload pipeline to apply new config setting?
	#importlib.invalidate_caches()
	#importlib.reload(pipeline)

	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Import_Data", "--local-scheduler"]
	proc = subprocess.Popen(cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	stdout, stderr = proc.communicate()

	#isSuccess = luigi.build([pipeline.Import_Data()], local_scheduler=True)

	# luigi log file path
	log_file = "/pipeline/AXIOME3/luigi_log/luigi.log"
	return log_file

@celery.task(name="pipeline.run.move")
def move_log_task(original_log, _id):
	new_log = os.path.join("/log", _id, "luigi.log")

	shutil.move(original_log, new_log)

	return "Moved!"