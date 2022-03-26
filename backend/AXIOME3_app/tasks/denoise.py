from AXIOME3_app.extensions import celery
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.notification.WebSocket import WebSocket
from AXIOME3_app.notification.Email import EmailNotification
from AXIOME3_app.tasks.Task import DenoiseTask

from AXIOME3_app.tasks.utils import (
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
	
	websocket = WebSocket(messageQueueURL=URL, room=_id,)
	denoise = DenoiseTask(websocket=websocket, task_id=_id)
	email = EmailNotification(task_id=_id)

	try:
		denoise.generate_config(
			logging_config=logging_config,
			manifest_path=manifest_path,
			sample_type=sample_type,
			input_format=input_format,
			is_multiple=is_multiple,
			trim_left_f=trim_left_f,
			trunc_len_f=trunc_len_f,
			trim_left_r=trim_left_r,
			trunc_len_r=trunc_len_r,
			n_cores=n_cores,
		)

		denoise.execute()

		message = denoise.success_message

	except Exception as err:
		message = "Error: " + str(err)

		logger.error(str(err))

		return

	finally:
		denoise.notify(message)

		email.send_email(
			sender=sender,
			recipient=recipient,
			subject=email.email_subject,
			task_name=denoise.task_type,
			message=message,
		)

def denoise(_id, sender, recipient, email_subject, task_progress_file):
	# Running luigi in python sub-shell so that each request can be logged in separate logfile.
	# It's really hard to have separate logfile if running luigi as a module.
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Run_Denoise_Tasks", "--local-scheduler"]
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