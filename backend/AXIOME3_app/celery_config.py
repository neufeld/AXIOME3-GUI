broker_url='pyamqp://axiome3:neufeld@rabbit/axiome3_host'
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