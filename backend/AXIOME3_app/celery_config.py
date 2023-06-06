import os
broker_url = 'UNDEFINED3'
if os.environ.get("RUN_ENV") == "8081":
	broker_url='pyamqp://axiome3:neufeld@rabbit2/axiome3_host'
elif os.environ.get("RUN_ENV") == "8080":
	broker_url='pyamqp://axiome3:neufeld@rabbit/axiome3_host'
elif os.environ.get("RUN_ENV") == "8082":
	broker_url='pyamqp://axiome3:neufeld@rabbit3/axiome3_host'
print("Celery Config URL is: " + broker_url)

# Following line doesn't work: need to figure out how env variables are transferred in docker.
# broker_url='pyamqp://' + os.getenv("RABBITMQ_DEFAULT_USER") + ':' + os.getenv("RABBITMQ_DEFAULT_PASS") + 'neufeld@rabbit/' + os.getenv("RABBITMQ_DEFAULT_VHOST")
result_backend='rpc://'

task_routes = {
	'pipeline.run.*': 
		{
			'queue': 'pipeline',
		},
	'extension.*': 
		{
			'queue': 'extension',
		},
}

worker_prefetch_multiplier=1
task_acks_late=True