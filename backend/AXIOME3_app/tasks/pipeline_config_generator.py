from AXIOME3_app.extensions import celery
from AXIOME3_app.datahandle.config_generator import make_luigi_config

@celery.task(name="pipeline.run.config")
def config_task(_id, logging_config, manifest_path=None, sample_type=None, input_format=None,
	trim_left_f=None, trunc_len_f=None, trim_left_r=None, trunc_len_r=None,
	classifier_path=None, sampling_depth=None, metadata_path=None, n_cores=None):
	# do something

	make_luigi_config(
		_id=_id, 
		logging_config=logging_config,
		manifest_path=manifest_path,
		sample_type=sample_type,
		input_format=input_format,
		trim_left_f=trim_left_f,
		trunc_len_f=trunc_len_f,
		trim_left_r=trim_left_r,
		trunc_len_r=trunc_len_r,
		classifier_path=classifier_path,
		sampling_depth=sampling_depth,
		metadata_path=metadata_path,
		n_cores=n_cores
	)

	return _id