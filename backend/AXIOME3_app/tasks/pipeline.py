from AXIOME3_app.extensions import celery
import os

from flask_socketio import SocketIO

@celery.task(name="pipeline.run.move")
def check_output_task(_id, URL, form_type):
	output_dir = os.path.join("output", _id)
	# Path to luigi log file for each request
	luigi_log_path = os.path.join("/log", _id, "luigi_log.log")

	# Check if final output for each step is generated.
	# If can't be found, return content of the logfile to the client
	luigi_log_content = ''
	final_output = ''

	if(form_type == "InputUpload"):
		final_output = os.path.join(output_dir, "paired-end-demux.qzv")

	elif(form_type == "Denoise"):
		final_output = os.path.join(output_dir, "dada2", "sample_counts.tsv")

	elif(form_type == "Analysis"):
		final_output = os.path.join(output_dir, "taxonomy", "taxonomy.qza")

	# Read the content of the logfile
	if not(os.path.exists(final_output)):
		with open(luigi_log_path, 'r') as fh:
			luigi_log_content = fh.readlines()

	local_socketio = SocketIO(message_queue=URL)
	message = "ERROR: " + ''.join(luigi_log_content) if luigi_log_content else "Done!"
	
	local_socketio.emit(
		'test',
		{'data': message},
		namespace='/test',
		engineio_logger=True,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)