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
from scripts.qiime2_helper.generate_pcoa import (
	convert_qiime2_2_skbio,
	generate_pcoa_plot,
	save_plot
)

@celery.task(name="pipeline.run.pcoa")
def pcoa_task(_id, URL, task_progress_file, pcoa, metadata,
	colouring_variable, shape_variable=None, primary_dtype='category',
	secondary_dtype='category', alpha=0.8, stroke=0.6, point_size=6,
	PC_axis1='PC1', PC_axis2='PC2'):

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

	pcoa_artifact = convert_qiime2_2_skbio(pcoa)
	plot = generate_pcoa_plot(
		pcoa=pcoa_artifact,
		metadata=metadata,
		colouring_variable=colouring_variable,
		shape_variable=shape_variable,
		primary_dtype=primary_dtype,
		secondary_dtype=secondary_dtype,
		alpha=alpha,
		stroke=stroke,
		point_size=point_size,
		PC_axis1=PC_axis1,
		PC_axis2=PC_axis2
	)

	# Save as pdf and png
	save_plot(pcoa_plot=plot, filename=filename, output_dir=output_dir, file_format='pdf')
	save_plot(pcoa_plot=plot, filename=filename, output_dir=output_dir, file_format='png')

	message = "Done!"
	emit_message(
		socketio=local_socketio,
		channel=channel,
		message=message,
		namespace=namespace,
		room=room
	)
	log_status(task_progress_file, message)