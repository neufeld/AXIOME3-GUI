import os
from flask_socketio import SocketIO

from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.extensions import celery
from AXIOME3_app.tasks.utils import (
	configure_celery_task_logger,
	log_status,
	emit_message,
	run_command,
	cleanup_error_message
)

# Import from AXIOME3 pipeline
# Note PYTHONPATH is added in docker-compose.yml to enable searching in pipeline directory
from exceptions.exception import AXIOME3Error as AXIOME3PipelineError
from scripts.qiime2_helper.bubbleplot import (
	prep_bubbleplot,
	make_bubbleplot,
	save_plot
)

logger = get_task_logger(__name__)
	
@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@celery.task(name="extension.bubbleplot")
def bubbleplot_task(_id, URL, task_progress_file, feature_table_artifact_path,
	taxonomy_artifact_path, metadata_path=None, level="asv", groupby_taxa="phylum", 
	abundance_threshold=0.1, keyword=None, fill_variable=None, brewer_type="qual",
	palette="Paired", alpha=0.9, stroke=0.6, width=300, height=300):
	
	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id
	output_dir = os.path.join('/output', _id)
	filename = 'plot'

	message = 'Generating bubble plot...'
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)

	try:
		bubbleplot_df = prep_bubbleplot(
			feature_table_artifact_path=feature_table_artifact_path,
			taxonomy_artifact_path=taxonomy_artifact_path,
			metadata_path=metadata_path,
			level=level,
			abundance_threshold=abundance_threshold,
			groupby_taxa=groupby_taxa,
			keyword=keyword
		)
	except AXIOME3PipelineError as err:
		message = str(err)
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
		return
	except Exception as err:
		logger.error(err, exc_info=True)
		message = "Error: Internal Server Error..."
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
		return

	try:
		bubbleplot_obj = make_bubbleplot(
			df=bubbleplot_df,
			fill_variable=fill_variable,
			palette=palette,
			brewer_type=brewer_type,
			alpha=alpha,
			stroke=stroke
		)
	except AXIOME3PipelineError as err:
		message = str(err)
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
		return
	except Exception as err:
		logger.error(err, exc_info=True)
		message = "Error: Internal Server Error..."
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
		return

	try:
		# Save as pdf and png
		save_plot(plot=bubbleplot_obj, filename=filename, output_dir=output_dir, file_format='pdf', width=float(width), height=float(height))
		save_plot(plot=bubbleplot_obj, filename=filename, output_dir=output_dir, file_format='png', width=float(width), height=float(height))
	except AXIOME3PipelineError as err:
		message = str(err)
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
		return
	except Exception as err:
		logger.error(err, exc_info=True)
		message = "Error: Internal Server Error..."
		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)
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