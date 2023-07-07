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
		r = "UNDEFINED"
		user = os.environ.get("RABBITMQ_DEFAULT_USER")
		password = os.environ.get("RABBITMQ_DEFAULT_PASS")
		host = os.environ.get("RABBITMQ_DEFAULT_VHOST")
		if os.environ.get("RUN_ENV") == "8081":
			r = requests.post(
				f'http://rabbit2:15672/api/queues/' + host + '/{queue_name}/get',
				auth=(user, password),
				data=json.dumps(self.payload),
			)
		elif os.environ.get("RUN_ENV") == "8080":
			r = requests.post(
				f'http://rabbit:15672/api/queues/' + host + '/{queue_name}/get',
				auth=(user, password),
				data=json.dumps(self.payload),
			)
		elif os.environ.get("RUN_ENV") == "8082":
			r = requests.post(
				f'http://rabbit3:15672/api/queues/' + host + '/{queue_name}/get',
				auth=(user, password),
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