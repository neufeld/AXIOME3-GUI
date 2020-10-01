from AXIOME3_app.extensions import celery
from AXIOME3_app.email.gmail import SendMessage
from AXIOME3_app.datahandle.config_generator import make_luigi_config
from AXIOME3_app.exceptions.exception import AXIOME3Error as AXIOME3WebAppError
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from flask_socketio import SocketIO
import subprocess

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

@celery.task(name="pipeline.run.denoise")
def denoise_task(_id, logging_config, manifest_path, sample_type, input_format,
	trim_left_f, trunc_len_f, trim_left_r, trunc_len_r, is_multiple, n_cores,
	URL, task_progress_file, sender, recipient):
	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id
	email_subject = "AXIOME3 task result"

	try:
		make_luigi_config(
			_id=_id, 
			logging_config=logging_config,
			manifest_path=manifest_path,
			sample_type=sample_type,
			input_format=input_format,
			is_multiple=is_multiple,
			trim_left_f=trim_left_f,
			trunc_len_f=trunc_len_f,
			trim_left_r=trim_left_r,
			trunc_len_r=trunc_len_r,
			n_cores=n_cores
		)

		taskMessage = 'Running denoise!'
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=taskMessage,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, taskMessage)
		denoise(
			_id=_id,
			sender=sender,
			recipient=recipient,
			email_subject=email_subject,
			task_progress_file=task_progress_file
		)

		doneMessage = "Done!"
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=doneMessage,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, doneMessage)
		SendMessage(
			sender=sender,
			to=recipient,
			subject=email_subject,
			msgHtml=generate_html(_id, doneMessage, "Denoise")
		)
	except AXIOME3WebAppError as err:
		message = "Error: " + str(err)
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

def denoise(_id, sender, recipient, email_subject, task_progress_file):
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

		log_status(task_progress_file, message_cleanup)
		SendMessage(
			sender=sender,
			recipient=recipient,
			subject=email_subject,
			msgHtml=generate_html(_id, message_cleanup, "Denoise")
		)

		raise AXIOME3WebAppError(message_cleanup)