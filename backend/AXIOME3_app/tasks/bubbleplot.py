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
from scripts.qiime2_helper.bubbleplot import (
	prep_bubbleplot,
	make_bubbleplot,
	save_plot
)

@celery.task(name="extension.bubbleplot")
def bubbleplot_task(_id, URL, task_progress_file, feature_table_artifact_path,
	taxonomy_artifact_path, level="asv", groupby_taxa="phylum", keyword=None,
	width=300, height=300):
	
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
			level=level,
			groupby_taxa=groupby_taxa,
			keyword=keyword
		)
	except ValueError as error:
		message = str(error)

		emit_message(
			socketio=local_socketio,
			channel=channel,
			message=message,
			namespace=namespace,
			room=room
		)
		log_status(task_progress_file, message)

	bubbleplot_obj = make_bubbleplot(
		df=bubbleplot_df
	)

	# Save as pdf and png
	save_plot(plot=bubbleplot_obj, filename=filename, output_dir=output_dir, file_format='pdf', width=float(width), height=float(height))
	save_plot(plot=bubbleplot_obj, filename=filename, output_dir=output_dir, file_format='png', width=float(width), height=float(height))

	message = "Done!"
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)