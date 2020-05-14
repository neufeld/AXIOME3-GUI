import os
from qiime2 import Artifact
# Custom backend util functions
from AXIOME3_app.utils import responseIfError
from AXIOME3_app.datahandle.luigi_prep_helper import (
	make_dir,
	copy_file,
	save_uploaded_file
)

def denoise_precheck(_id, sequence_data):
	"""
	Do prechecks as to decrease the chance of job failing.

	Input:
		- sequence_data: sequence data in QIIME2 artifact format
	"""
	# Save uploaded file in the docker container
	upload_path = save_uploaded_file(_id, sequence_data)

	def validate_denoise_input(sequence_data):
		"""
		Precheck input files prior to running denoise step

		Input:
			- sequence_data: sequence data in QIIME2 artifact format
		"""

		# Check Artifact type
		try:
			q2_artifact = Artifact.load(sequence_data)
			if(str(q2_artifact.type) != "SampleData[PairedEndSequencesWithQuality]"):
				msg = "Input QIIME2 Artifact is not of type 'SampleData[PairedEndSequencesWithQuality]'!"
				raise ValueError(msg)

		except ValueError as err:
			message = str(err)

			return 400, message

		return 200, "Imported data good!"

	responseIfError(validate_denoise_input, sequence_data=upload_path)

	return upload_path

def denoise_setup(denoise_input, _id):
	destination_dir = os.path.join('/output', _id)
	destination = os.path.join(destination_dir, "paired_end_demux.qza")

	responseIfError(make_dir, dirpath=destination_dir)
	responseIfError(copy_file, source=denoise_input, destination=destination)