from AXIOME3_app.extensions import celery
import time

@celery.task(bind=True, name="pipeline.run.import")
def dummy_task(self):
	time.sleep(1)
	self.update_state(state="PROGRESS", meta={'progress': 50})
	time.sleep(1)
	self.update_state(state="PROGRESS", meta={'progress': 90})
	time.sleep(1)

	return 'hello world'