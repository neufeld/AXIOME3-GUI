from AXIOME3_app.extensions import celery
from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.notification.WebSocket import WebSocket
from AXIOME3_app.notification.Email import EmailNotification
from AXIOME3_app.tasks.Task import InputUploadTask

from AXIOME3_app.tasks.utils import (
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

	websocket = WebSocket(messageQueueURL=URL, room=_id,)
	input_upload = InputUploadTask(websocket=websocket, task_id=_id)
	email = EmailNotification(task_id=_id)

	try:
		input_upload.generate_config(
			logging_config=logging_config,
			manifest_path=manifest_path,
			sample_type=sample_type,
			input_format=input_format,
			is_multiple=is_multiple,
		)

		input_upload.execute()

		message = input_upload.success_message

	except Exception as err:
		message = "Error: " + str(err)

		logger.error(message)

		return

	finally:
		input_upload.notify(message)

		email.send_email(
			sender=sender,
			recipient=recipient,
			subject=email.email_subject,
			task_name=input_upload.task_type,
			message=message,
		)