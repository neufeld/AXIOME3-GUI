# Redis
#CELERY_BROKER_URL='redis://redis:6379/0'
#CELERY_RESULT_BACKEND='redis://redis:6379/0'
# RabbitMQ
CELERY_BROKER_URL='pyamqp://admin:mypass@rabbit//'
CELERY_RESULT_BACKEND='rpc://'