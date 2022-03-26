from AXIOME3_app.extensions import celery
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.notification.WebSocket import WebSocket
from AXIOME3_app.notification.Email import EmailNotification
from AXIOME3_app.tasks.Task import AnalysisTask

from AXIOME3_app.tasks.utils import (
	configure_celery_task_logger
)

logger = get_task_logger(__name__)

@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@celery.task(name="pipeline.run.analysis")
def analysis_task(_id, logging_config, sampling_depth, metadata_path, 
	n_cores, URL, task_progress_file, sender, recipient):

	websocket = WebSocket(messageQueueURL=URL, room=_id,)
	analysis = AnalysisTask(websocket=websocket, task_id=_id)
	email = EmailNotification(task_id=_id)

	try:
		analysis.generate_config(
			logging_config=logging_config,
			sampling_depth=sampling_depth,
			metadata_path=metadata_path,
			n_cores=n_cores,
		)

		analysis.execute()

		message = analysis.success_message

	except Exception as err:
		message = "Error: " + str(err)

		logger.error(str(err))

		return

	finally:
		analysis.notify(message)

		email.send_email(
			sender=sender,
			recipient=recipient,
			subject=email.email_subject,
			task_name=analysis.task_type,
			message=message,
		)

def analysis_module(_id, sender, recipient, email_subject, task_progress_file):
	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Analysis_Module", "--local-scheduler"]
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
			msgHtml=generate_html(_id, message_cleanup, "Analysis")
		)

		raise AXIOME3WebAppError(message_cleanup)

	cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "PCoA_Plots_jpeg", "--local-scheduler"]
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
			msgHtml=generate_html(_id, message_cleanup, "Analysis")
		)

		raise AXIOME3WebAppError(message_cleanup)