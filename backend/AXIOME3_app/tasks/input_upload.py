from AXIOME3_app.extensions import celery
from AXIOME3_app.email.gmail import SendMessage
from AXIOME3_app.datahandle.config_generator import make_luigi_config
from AXIOME3_app.exceptions.exception import AXIOME3Error as AXIOME3WebAppError
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.notification.WebSocket import WebSocket
from AXIOME3_app.notification.Email import EmailNotification

import subprocess

from AXIOME3_app.tasks.utils import (
	log_status,
	run_command,
	cleanup_error_message,
	generate_html,
	configure_celery_task_logger
)

logger = get_task_logger(__name__)

@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@celery.task(name="pipeline.run.import")
def import_data_task(_id, logging_config, manifest_path, sample_type, input_format,
	is_multiple, URL, task_progress_file, sender, recipient):

	
	local_socketio = WebSocket(messageQueueURL=URL, room=_id)
	email = EmailNotification(_id)
	email_subject = "AXIOME3 task result"

	try:
		make_luigi_config(
			_id=_id, 
			logging_config=logging_config,
			manifest_path=manifest_path,
			sample_type=sample_type,
			input_format=input_format,
			is_multiple=is_multiple
		)

		taskMessage = "Running import data!"
		local_socketio.emit(taskMessage)
		log_status(task_progress_file, taskMessage)

		import_data(
			_id=_id,
			sender=sender,
			recipient=recipient,
			email_subject=email_subject,
			task_progress_file=task_progress_file
		)
	
		doneMessage = "Done!"
		local_socketio.emit(doneMessage)
		log_status(task_progress_file, doneMessage)
		#SendMessage(
		#	sender=sender,
		#	recipient=recipient,
		#	subject=email_subject,
		#	msgHtml=generate_html(_id, doneMessage, "Input Upload")
		#)
		email.send_email(
			sender=sender,
			recipient=recipient,
			subject=email_subject,
			task_name="Input Upload",
			message=doneMessage,
		)


	except AXIOME3WebAppError as err:
		message = "Error: " + str(err)
		logger.error(message)
		log_status(task_progress_file, message)

		local_socketio.emit(message)
		return
	except Exception as err:
		message = "Error: Internal Server Error..."
		logger.error(str(err))
		log_status(task_progress_file, message)

		local_socketio.emit(message)
		return


def import_data(_id, sender, recipient, email_subject, task_progress_file):
	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Run_Input_Upload_Tasks", "--local-scheduler"]
	stdout, stderr = run_command(cmd)

	decoded_stdout = stdout.decode('utf-8')

	if("ERROR" in decoded_stdout):
		# pipeline adds <--> to the error message as to extract the meaningful part
		if("<-->" in decoded_stdout):
			message = decoded_stdout.split("<-->")[1]
		else:
			message = decoded_stdout
		message_cleanup = 'ERROR:\n' + cleanup_error_message(message)

		log_status(task_progress_file, message_cleanup)
		SendMessage(
			sender=sender,
			recipient=recipient,
			subject=email_subject,
			msgHtml=generate_html(_id, message_cleanup, "Input Upload")
		)

		raise AXIOME3WebAppError(message_cleanup)