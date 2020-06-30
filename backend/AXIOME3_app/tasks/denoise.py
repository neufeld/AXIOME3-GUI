from AXIOME3_app.extensions import celery
from AXIOME3_app.extensions import mail
import subprocess

from flask_socketio import SocketIO

from AXIOME3_app.tasks.utils import (
	log_status,
	emit_message,
	run_command,
	cleanup_error_message,
	construct_email,
	generate_html
)

@celery.task(name="pipeline.run.denoise")
def denoise_task(_id, URL, task_progress_file, recipient):
	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id

	isTaskDone, message = denoise(
		socketio=local_socketio,
		room=room,
		channel=channel,
		namespace=namespace,
		task_progress_file=task_progress_file
	)

	if(isTaskDone == False):
		if(recipient is not None):
			email_message = construct_email(
				recipient=recipient,
				html=generate_html(_id, message)
			)
			mail.send(email_message)
		return

	message = "Done!"
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)

	if(recipient is not None):
		email_message = construct_email(
			recipient=recipient,
			html=generate_html(_id, message)
		)
		mail.send(email_message)

def denoise(socketio, room, channel, namespace, task_progress_file):
	message = 'Running denoise!'
	emit_message(
		socketio=socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)

	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Sample_Count_Summary", "--local-scheduler"]
	stdout, stderr = run_command(cmd)

	decoded_stdout = stdout.decode('utf-8')

	if("ERROR" in decoded_stdout):
		# pipeline adds <--> to the error message as to extract the meaningful part 
		if("<-->" in decoded_stdout):
			message = decoded_stdout.split("<-->")[1]
		else:
			message = decoded_stdout
		message_cleanup = 'ERROR:\n' + cleanup_error_message(message)
		emit_message(
			socketio=socketio,
			channel=channel,
			message=message_cleanup,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message_cleanup)

		return False, message_cleanup

	return True, ""