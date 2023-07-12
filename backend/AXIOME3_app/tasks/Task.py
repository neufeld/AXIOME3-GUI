import os
import re
import subprocess

from AXIOME3_app.notification.WebSocket import WebSocket

from AXIOME3_app.exceptions.exception import AXIOME3Error as AXIOME3WebAppError

class Axiome3Task(object):
	def __init__(self, websocket: WebSocket, task_id: str):
		self.socketio = websocket

		self.task_id = task_id
		self.task_progress_file_path = os.path.join('/output', self.task_id, 'task_progress.txt')

		self.success_message = "Done!"

	def run_command(self, cmd: list):
		proc = subprocess.Popen(
			cmd,
			stdout=subprocess.PIPE,
			stderr=subprocess.PIPE,
		)
	
		stdout, stderr = proc.communicate()

		return stdout, stderr

	def generate_command(self):
		raise NotImplementedError

	def execute(self):
		raise NotImplementedError

	def notify(self, message):
		self.socketio.emit(message)
		self.log_status(message)			

	def filter_error(self, error: str) -> str:
		"""
		Currently, AXIOME3 pipeline adds
		<--> to the error message as to extract the meaningful part
		"""
		decoded = error.decode('utf-8')

		if not ("ERROR" in decoded):
			return ""

		if("<-->" in decoded):
			message = decoded.split("<-->")[1]
		else:
			message = decoded
		message_cleanup = 'ERROR:\n' + self._cleanup_error_message(message)

		return message_cleanup
		
	def _cleanup_error_message(self, message: str) -> str:
		"""
		Removes anything between 'Traceback' and two newline characters
		"""
		pattern = r'(Traceback[\s\S]*?\n\n)'

		matched = re.search(pattern, message)

		if(matched is None):
			return message

		to_remove = matched.group(1)

		return message.replace(to_remove, '').strip()

	def generate_config(self, task_type, logging_config, manifest_path=None, sample_type=None, input_format=None,
				trim_left_f=None, trunc_len_f=None, trim_left_r=None, trunc_len_r=None, is_multiple=None,
				classifier_path=None, sampling_depth=None, metadata_path=None, n_cores=None):
		"""
		Make configuration file for luigi from the template file
		(at /pipeline/configuration/template.cfg).

		- Returns: path to the new configuration file.
		"""
		# AXIOME3 is installed in the container via a dockerfile.
		# backend/dev.dockerfile
		template_config_path = "/pipeline/configuration/template.cfg"

		config_data = self._read_template_config(template_config_path)

		# Replace task type placefolder with actual task type
		config_data = config_data.replace("<TASK_TYPE>", task_type)

		# Replace output prefix placeholder with actual path
		output_dir = os.path.join("/output", self.task_id)
		config_data = config_data.replace("<OUTPUT>", output_dir)

		# Replace logging path placeholder with actual path
		config_data = config_data.replace("<LOGGING_CONFIG_FILE>", logging_config)

		# Replace resptive field with user specified values
		if(manifest_path is not None):
			config_data = config_data.replace("<MANIFEST_PATH>", manifest_path)

		if(sample_type is not None):
			config_data = config_data.replace("<SAMPLE_TYPE>", sample_type)

		if(is_multiple is not None):
			config_data = config_data.replace("<IS_MULTIPLE>", is_multiple)

		if(input_format is not None):
			config_data = config_data.replace("<INPUT_FORMAT>", input_format)

		if(trim_left_f is not None):
			config_data = config_data.replace("<TRIM_LEFT_F>", str(trim_left_f))

		if(trunc_len_f is not None):
			config_data = config_data.replace("<TRUNC_LEN_F>", str(trunc_len_f))

		if(trim_left_r is not None):
			config_data = config_data.replace("<TRIM_LEFT_R>", str(trim_left_r))

		if(trunc_len_r is not None):
			config_data = config_data.replace("<TRUNC_LEN_R>", str(trunc_len_r))

		if(classifier_path is not None):
			config_data = config_data.replace("<CLASSIFIER_PATH>", classifier_path)

		if(sampling_depth is not None):
			config_data = config_data.replace("<SAMPLING_DEPTH>", str(sampling_depth))

		if(metadata_path is not None):
			config_data = config_data.replace("<METADATA_PATH>", str(metadata_path))

		if(n_cores is not None):
			config_data = config_data.replace("<N_CORES>", str(n_cores))

		# Overwrite existing config file
		# Can't set env variable inside docker container,
		# so need to have one master config file
		master_config_path = "/pipeline/configuration/luigi.cfg"

		try:
			with open(master_config_path, 'w') as fh:
				fh.write(config_data)
		except OSError:
			# TODO: log
			message = "Cant create a luigi config file."
			code = 500

			return code, message

		# Make a copy for debugging purpose
		base_dir = os.path.join('/output', self.task_id)
		new_config_path = os.path.join(base_dir, "luigi.cfg")

		try:
			with open(new_config_path, 'w') as fh:
				fh.write(config_data)
		except OSError:
			# TODO: log
			message = "Cant create a luigi config file."
			code = 500

			return code, message 

		# Return the complete configuration path so that it can be set
		# as an environment variable.
		return 200, master_config_path

	def _read_template_config(self, template_path: str) -> str:
		"""
		Read template configuration file, and store it as a string.

		- Returns: file content as a string.
		"""
		with open(template_path, 'r') as fh:
			file_content = fh.readlines()

		return ''.join(file_content)

	def log_status(self, message: str):
		with open(self.task_progress_file_path, 'w') as fh:
			fh.write(message)

class InputUploadTask(Axiome3Task):
	def __init__(self, websocket: WebSocket, task_id: str):
		super().__init__(websocket, task_id)

		self.task_type = "Input Upload"

	def generate_command(self):
		cmd = [
			"python",
			"/pipeline/pipeline.py",
			"Run_Input_Upload_Tasks",
			"--local-scheduler",
		]

		return cmd

	def execute(self):
		command = self.generate_command()

		task_message = "Running Input Upload!"
		self.notify(task_message)

		stdout, stderr = self.run_command(command)
		print("HERE stdout for input upload")
		print(stdout.decode('utf-8'))
		print("END")
		error = self.filter_error(stdout)

		if(error):
			raise AXIOME3WebAppError(error)

class DenoiseTask(Axiome3Task):
	def __init__(self, websocket: WebSocket, task_id: str):
		super().__init__(websocket, task_id)

		self.task_type = "Denoise"

	def generate_command(self):
		cmd = [
			"python",
			"/pipeline/pipeline.py",
			"Run_Denoise_Tasks",
			"--local-scheduler",
		]

		return cmd

	def execute(self):
		command = self.generate_command()

		task_message = "Running Denoise!"
		self.notify(task_message)

		stdout, stderr = self.run_command(command)
		print("HERE stdout for DenoiseTask")
		print(stdout.decode('utf-8'))
		print(stderr.decode('utf-8'))
		error = self.filter_error(stdout)
		print("END")

		if(error):
			raise AXIOME3WebAppError(error)

class TaxonomicClassificationTask(Axiome3Task):
	def __init__(self, websocket: WebSocket, task_id: str):
		super().__init__(websocket, task_id)

		self.task_type = "Taxonomic Classification"

	def generate_command(self):
		cmd = [
			"python",
			"/pipeline/pipeline.py",
			"Run_TaxonomicClassification_Tasks",
			"--local-scheduler",
		]

		return cmd

	def execute(self):
		command = self.generate_command()

		task_message = "Running Taxonomic Classification!"
		self.notify(task_message)

		stdout, stderr = self.run_command(command)
		error = self.filter_error(stdout)

		if(error):
			raise AXIOME3WebAppError(error)

class AnalysisTask(Axiome3Task):
	def __init__(self, websocket: WebSocket, task_id: str):
		super().__init__(websocket, task_id)

		self.task_type = "Analysis"

	def generate_command(self):
		cmd = [
			"python",
			"/pipeline/pipeline.py",
			"Run_Analysis_Tasks",
			"--local-scheduler",
		]

		return cmd

	def execute(self):
		command = self.generate_command()

		task_message = "Running Analysis!"
		self.notify(task_message)

		stdout, stderr = self.run_command(command)
		error = self.filter_error(stdout)

		if(error):
			raise AXIOME3WebAppError(error)