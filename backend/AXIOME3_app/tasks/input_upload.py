from AXIOME3_app.extensions import celery
from AXIOME3_app.email.gmail import SendMessage
from AXIOME3_app.exceptions.exception import AXIOME3Error as AXIOME3WebAppError
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

import luigi
#import pipeline # AXIOME3 Pipeline; its path shouldve been added
import os
import subprocess
import sys

from flask_socketio import SocketIO

from AXIOME3_app.tasks.utils import (
	log_status,
	emit_message,
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
def import_data_task(_id, URL, task_progress_file, sender, recipient):
	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id
	email_subject = "AXIOME3 task result"

	isTaskDone, message = import_data(
		socketio=local_socketio,
		room=room,
		channel=channel,
		namespace=namespace,
		task_progress_file=task_progress_file
	)

	if(isTaskDone == False):
		# send email on task completion
		if(recipient is not None):
			try:
				SendMessage(
					sender=sender,
					to=recipient,
					subject=email_subject,
					msgHtml=generate_html(_id, message, "Input Upload")
				)
			except AXIOME3WebAppError as err:
				message = "Error: " + str(err.message)
				logger.error(message)
				log_status(task_progress_file, message)

				emit_message(
					socketio=local_socketio,
					channel=channel,
					message=message,
					namespace=namespace,
					room=room
				)
				return
			except Exception as err:
				message = "Error: Internal Server Error..."
				logger.error(str(err))
				log_status(task_progress_file, message)

				emit_message(
					socketio=local_socketio,
					channel=channel,
					message=message,
					namespace=namespace,
					room=room
				)
				return
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

	# send email on task completion
	if(recipient is not None):
		try:
			SendMessage(
				sender=sender,
				to=recipient,
				subject=email_subject,
				msgHtml=generate_html(_id, message, "Input Upload")
			)
		except AXIOME3WebAppError as err:
			message = "Error: " + str(err.message)
			logger.error(message)
			log_status(task_progress_file, message)

			emit_message(
				socketio=local_socketio,
				channel=channel,
				message=message,
				namespace=namespace,
				room=room
			)
			return
		except Exception as err:
			message = "Error: Internal Server Error..."
			logger.error(str(err))
			log_status(task_progress_file, message)

			emit_message(
				socketio=local_socketio,
				channel=channel,
				message=message,
				namespace=namespace,
				room=room
			)
			return

def import_data(socketio, room, channel, namespace, task_progress_file):
	message = 'Running import data!'
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
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Summarize", "--local-scheduler"]
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