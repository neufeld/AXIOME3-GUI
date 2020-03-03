from AXIOME3_app.extensions import celery
import luigi
import pipeline # AXIOME3 Pipeline; its path shouldve been added
import importlib

@celery.task(bind=True, name="pipeline.run.import")
def dummy_task(self):
	# Reload pipeline to apply new config setting?
	importlib.invalidate_caches()
	importlib.reload(pipeline)

	isSuccess = luigi.build([pipeline.Import_Data()], local_scheduler=True)

	return "Done!"