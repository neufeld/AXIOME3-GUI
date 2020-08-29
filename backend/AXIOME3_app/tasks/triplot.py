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
from scripts.qiime2_helper.triplot import (
	prep_triplot_input,
	make_triplot,
	save_plot
)

logger = get_task_logger(__name__)
	
@after_setup_task_logger.connect
def after_setup_celery_task_logger(logger, **kwargs):
	""" This function sets the 'celery.task' logger handler and formatter """
	configure_celery_task_logger(logger)

@celery.task(name="extension.triplot")
def triplot_task(_id, URL, task_progress_file, feature_table_artifact_path,
	taxonomy_artifact_path, metadata_path, environmental_metadata_path, 
	sampling_depth, ordination_collapse_level, wascores_collapse_level,
	dissmilarity_index, R2_threshold, pval_threshold, wa_threshold, fill_variable, 
	fill_variable_dtype, colour_set, brewer_type, point_size, alpha, stroke,
	PC_axis_one, PC_axis_two, width, height, x_axis_text_size, y_axis_text_size,
	legend_title_size, legend_text_size, taxa_text_size, vector_arrow_text_size):
	logger.info("Triplot task started for 'session, {_id},'".format(_id=_id))

	local_socketio = SocketIO(message_queue=URL)
	channel = 'test'
	namespace = '/AXIOME3'
	room = _id
	output_dir = os.path.join('/output', _id)
	filename = 'plot'

	message = 'Generating Triplot...'
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)

	try:
		merged_df, vector_arrow_df, wascores_df, proportion_explained, projection_df, sample_summary = prep_triplot_input(
			sample_metadata_path=metadata_path,
			env_metadata_path=environmental_metadata_path,
			feature_table_artifact_path=feature_table_artifact_path,
			taxonomy_artifact_path=taxonomy_artifact_path,
			sampling_depth=sampling_depth,
			ordination_collapse_level=ordination_collapse_level,
			wascores_collapse_level=wascores_collapse_level,
			dissmilarity_index=dissmilarity_index,
			R2_threshold=R2_threshold,
			pval_threshold=pval_threshold,
			wa_threshold=wa_threshold,
			PC_axis_one=PC_axis_one,
			PC_axis_two=PC_axis_two
		)

		# Save vector arrow df
		projection_df_fname = os.path.join(output_dir, "vector_arrow_summary.csv")
		projection_df.to_csv(projection_df_fname)

		# Save sample summary
		sample_summary_fname = os.path.join(output_dir, "sample_summary.csv")
		with open(sample_summary_fname, 'w') as fh:
			fh.write(sample_summary)
	# Replace with AXIOME3_Error in the future?
	except AXIOME3PipelineError as err:
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

	if(fill_variable_dtype == 'numeric'):
		fill_variable_dtype = 'float64'
	try:
		triplot = make_triplot(
			merged_df=merged_df,
			vector_arrow_df=vector_arrow_df,
			wascores_df=wascores_df,
			proportion_explained=proportion_explained,
			fill_variable=fill_variable,
			fill_variable_dtype=fill_variable_dtype,
			palette=colour_set,
			brewer_type=brewer_type,
			PC_axis_one=PC_axis_one,
			PC_axis_two=PC_axis_two,
			alpha=alpha,
			stroke=stroke,
			point_size=point_size,
			x_axis_text_size=x_axis_text_size,
			y_axis_text_size=y_axis_text_size,
			legend_title_size=legend_title_size,
			legend_text_size=legend_text_size,
			taxa_text_size=taxa_text_size,
			vector_arrow_text_size=vector_arrow_text_size
		)

	except AXIOME3PipelineError as err: 
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
		save_plot(plot=triplot, filename=filename, output_dir=output_dir, file_format='pdf', width=float(width), height=float(height))
		save_plot(plot=triplot, filename=filename, output_dir=output_dir, file_format='png', width=float(width), height=float(height))

	except AXIOME3PipelineError as err:
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