import subprocess
import re
import logging

def configure_celery_logger(logger):
	"""
	Celery app related logs
	"""
	# define logger
	formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
	fh = logging.FileHandler('/log/celery_app.log', mode='a')
	fh.setLevel(level=logging.INFO)
	fh.setFormatter(formatter)
	
	logger.addHandler(fh)
	logger.propagate = True

def configure_celery_task_logger(logger):
	"""
	Celery task specfic logs
	"""
	# define logger
	formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
	fh = logging.FileHandler('/log/celery_task.log', mode='a')
	fh.setLevel(level=logging.INFO)
	fh.setFormatter(formatter)
	
	logger.addHandler(fh)
	logger.propagate = False

def log_status(logfile, message):
	with open(logfile, 'w') as fh:
		fh.write(message)

def emit_message(socketio, channel, message, namespace, room):
	socketio.emit(
		channel,
		{'data': message},
		namespace=namespace,
		engineio_logger=True,
		room=room,
		logger=True,
		async_mode='threading', 
		broadcast=True
	)

def run_command(cmd):
	proc = subprocess.Popen(
		cmd,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE
	)
	
	stdout, stderr = proc.communicate()

	return stdout, stderr

def cleanup_error_message(msg):
	"""
	Removes anything between 'Traceback' and two newline characters
	"""
	pattern = r'(Traceback[\s\S]*?\n\n)'

	matched = re.search(pattern, msg)

	if(matched is None):
		return msg

	to_remove = matched.group(1)

	return msg.replace(to_remove, '').strip()

def generate_html(_id, message, taskName):
	html = """
		<div>
			<h2>Session ID</h2>
			<p>{_id}</p>
			<h2>{taskName} Task Status</h2>
			<p>{message}</p>
		</div>
	""".format(_id=_id, taskName=taskName, message=message)

	return html