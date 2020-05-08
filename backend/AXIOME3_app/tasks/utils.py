import subprocess
import re

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