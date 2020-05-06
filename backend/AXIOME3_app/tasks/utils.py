import subprocess

def log_status(logfile, message):
	with open(logfile, 'w') as fh:
		fh.write(message)

def emit_message(socketio, channel, message, namespace):
	socketio.emit(
		channel,
		{'data': message},
		namespace=namespace,
		engineio_logger=True,
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