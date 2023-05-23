import requests
import json
import os

class TaskStatus(object):
	def __init__(self):
		def __init__(self):
			self.payload = {
				"count": 5,
				"ackmode": "ack_requeue_true",
				"encoding": "auto",
				"truncate": 50000,
			}

	def _browse_queue(queue_name: str):
		"""Browse rabbit mq queue. It's likely O(n) so not so scalable..."""
		# Technically should hide credentials lol
		r = "UNDEFINED"
		if os.environ.get("RUN_ENV") == "test":
			r = requests.post(
				f'http://rabbit2:15672/api/queues/axiome3_host/{queue_name}/get',
				auth=('axiome3', 'neufeld'),
				data=json.dumps(self.payload),
			)
		elif os.environ.get("RUN_ENV") == "official":
			r = requests.post(
				f'http://rabbit:15672/api/queues/axiome3_host/{queue_name}/get',
				auth=('axiome3', 'neufeld'),
				data=json.dumps(self.payload),
			)


		return r.json()

	def is_task_queued(task_id: str, queue_name: str = "pipeline") -> bool:
		"""Check if task is queued in the message queue."""
		queue_messages = self._browse_queue(queue_name)

		for message in queue_messages:
			if task_id.lower() == message['properties']['headers']['id'].lower():
				return True

		return False