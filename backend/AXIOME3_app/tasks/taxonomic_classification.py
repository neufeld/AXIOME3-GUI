from AXIOME3_app.extensions import celery
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.notification.WebSocket import WebSocket
from AXIOME3_app.notification.Email import EmailNotification
from AXIOME3_app.tasks.Task import TaxonomicClassificationTask

from AXIOME3_app.tasks.utils import (
	configure_celery_task_logger
)

logger = get_task_logger(__name__)

@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@celery.task(name="pipeline.run.taxonomic_classification")
def taxonomic_classification_task(_id, task_type, logging_config,
	classifier_path, n_cores, URL, task_progress_file, sender, recipient):
	
	websocket = WebSocket(messageQueueURL=URL, room=_id,)
	taxonomic_classification = TaxonomicClassificationTask(websocket=websocket, task_id=_id,)
	email = EmailNotification(task_id=_id)

	try:
		taxonomic_classification.generate_config(
			task_type=task_type,
			logging_config=logging_config,
			classifier_path=classifier_path,
			n_cores=n_cores,
		)

		taxonomic_classification.execute()

		message = taxonomic_classification.success_message

	except Exception as err:
		message = "Error: " + str(err)

		logger.error(str(err))

		return

	finally:
		taxonomic_classification.notify(message)

		email.send_email(
			sender=sender,
			recipient=recipient,
			subject=email.email_subject,
			task_name=taxonomic_classification.task_type,
			message=message,
		)

def taxonomic_classification(_id, sender, recipient, email_subject, task_progress_file):	
	cmd = ["python", "/pipeline/pipeline.py", "Export_Taxa_Collapse", "--local-scheduler"]
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
			msgHtml=generate_html(_id, message_cleanup, "Taxonomic Classification")
		)

		raise AXIOME3WebAppError(message_cleanup)