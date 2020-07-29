import os
from flask_socketio import SocketIO
import traceback
import logging

from celery.utils.log import get_task_logger
from celery.signals import after_setup_task_logger, after_setup_logger

from AXIOME3_app.extensions import celery
from AXIOME3_app.tasks.utils import (
	configure_celery_logger,
	configure_celery_task_logger,
	log_status,
	emit_message,
	run_command,
	cleanup_error_message
)

# Import from AXIOME3 pipeline
# Note PYTHONPATH is added in docker-compose.yml to enable searching in pipeline directory
from exceptions.exception import AXIOME3Error as AXIOME3PipelineError
from scripts.qiime2_helper.generate_pcoa import (
	convert_qiime2_2_skbio,
	generate_pcoa_plot,
	save_plot
)

logger = get_task_logger(__name__)
	
@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@after_setup_logger.connect
def after_setup_celery_logger(logger, **kwargs):
	""" This function sets the 'celery' logger handler and formatter """
	configure_celery_logger(logger)

@celery.task(name="extension.pcoa")
def pcoa_task(_id, URL, task_progress_file, pcoa, metadata,
	fill_variable, shape_variable=None, colour_set="Paired",
	brewer_type="qual", primary_dtype='category', secondary_dtype='category',
	alpha=0.8, stroke=0.6, point_size=6, width=100, height=90,
	x_axis_text_size=10, y_axis_text_size=10, legend_title_size=10, legend_text_size=10,
	PC_axis_1=1, PC_axis_2=2):

	logger.info("PCoA task started for 'session, {_id},'".format(_id=_id))

	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id
	output_dir = os.path.join('/output', _id)
	filename = 'plot'

	message = 'Generating PCoA plot...'
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)

	try:
		pcoa_artifact = convert_qiime2_2_skbio(pcoa)
	except (AXIOME3PipelineError) as err:
		message = "Error: " + str(err)

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
		plot = generate_pcoa_plot(
			pcoa=pcoa_artifact,
			metadata=metadata,
			colouring_variable=fill_variable,
			shape_variable=shape_variable,
			primary_dtype=primary_dtype,
			secondary_dtype=secondary_dtype,
			palette=colour_set,
			brewer_type=brewer_type,
			alpha=alpha,
			stroke=stroke,
			point_size=point_size,
			x_axis_text_size=x_axis_text_size,
			y_axis_text_size=y_axis_text_size,
			legend_title_size=legend_title_size,
			legend_text_size=legend_text_size,
			PC_axis1=PC_axis_1,
			PC_axis2=PC_axis_2
		)
	except (AXIOME3PipelineError) as err:
		message = "Error: " + str(err)

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
		save_plot(pcoa_plot=plot, filename=filename, output_dir=output_dir, file_format='pdf', width=float(width), height=float(height))
		save_plot(pcoa_plot=plot, filename=filename, output_dir=output_dir, file_format='png', width=float(width), height=float(height))
	except (AXIOME3PipelineError) as err:
		message = "Error: " + str(err)

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