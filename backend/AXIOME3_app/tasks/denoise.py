from AXIOME3_app.extensions import celery
import subprocess

from flask_socketio import SocketIO

from AXIOME3_app.tasks.utils import (
	log_status,
	emit_message,
	run_command
)

@celery.task(name="pipeline.run.denoise")
def denoise_task(_id, URL, task_progress_file):
	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/test'

	isTaskDone = denoise(
		socketio=local_socketio,
		channel=channel,
		namespace=namespace,
		task_progress_file=task_progress_file
	)

	if(isTaskDone == False):
		return

	message = "Done!"
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace 
	)
	log_status(task_progress_file, message)

def denoise(socketio, channel, namespace, task_progress_file):
	message = 'Running denoise!'
	emit_message(
		socketio=socketio,
		channel=channel,
		message=message,
		namespace=namespace 
	)
	log_status(task_progress_file, message)

	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Sample_Count_Summary", "--local-scheduler"]
	stdout, stderr = run_command(cmd)

	decoded_stdout = stdout.decode('utf-8')

	if("ERROR" in decoded_stdout):
		# pipeline adds <--> to the error message as to extract the meaningful part 
		message = decoded_stdout.split("<-->")[1]
		emit_message(
			socketio=socketio,
			channel=channel,
			message=message,
			namespace=namespace 
		)
		log_status(task_progress_file, message)

		return False

	return True