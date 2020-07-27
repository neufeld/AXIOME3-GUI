import os
from flask_socketio import SocketIO

from AXIOME3_app.extensions import celery
from AXIOME3_app.tasks.utils import (
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

@celery.task(name="extension.triplot")
def triplot_task(_id, URL, task_progress_file, feature_table_artifact_path,
	taxonomy_artifact_path, metadata_path, environmental_metadata_path,
	taxa_collapse_level, abundance_threshold, R2_threshold, wa_threshold,
	fill_variable, point_size, alpha, stroke, PC_axis_one, PC_axis_two,
	width, height, x_axis_text_size, y_axis_text_size, legend_title_size,
	legend_text_size):

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
		merged_df, vector_arrow_df, wascores_df, proportion_explained = prep_triplot_input(
			sample_metadata_path=metadata_path,
			env_metadata_path=environmental_metadata_path,
			feature_table_artifact_path=feature_table_artifact_path,
			taxonomy_artifact_path=taxonomy_artifact_path,
			collapse_level=taxa_collapse_level,
			abundance_threshold=abundance_threshold,
			R2_threshold=R2_threshold,
			wa_threshold=wa_threshold,
			PC_axis_one=PC_axis_one,
			PC_axis_two=PC_axis_two
		)
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

	try:
		triplot = make_triplot(
			merged_df=merged_df,
			vector_arrow_df=vector_arrow_df,
			wascores_df=wascores_df,
			proportion_explained=proportion_explained,
			fill_variable=fill_variable,
			PC_axis_one=PC_axis_one,
			PC_axis_two=PC_axis_two,
			alpha=alpha,
			stroke=stroke,
			point_size=point_size,
			x_axis_text_size=x_axis_text_size,
			y_axis_text_size=y_axis_text_size,
			legend_title_size=legend_title_size,
			legend_text_size=legend_text_size
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

	message = "Done!"
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)