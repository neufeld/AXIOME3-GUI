import os
CELERY_BROKER_URL = 'UNDEFINED2'
user = os.environ.get("RABBITMQ_DEFAULT_USER")
password = os.environ.get("RABBITMQ_DEFAULT_PASS")
host = os.environ.get("RABBITMQ_DEFAULT_VHOST")
if os.environ.get("RUN_ENV") == "8081":
    CELERY_BROKER_URL='pyamqp://' + user + ':' + password + '@rabbit2/' + host
elif os.environ.get("RUN_ENV") == "8080":
    CELERY_BROKER_URL = 'pyamqp://' + user + ':' + password + '@rabbit/' + host
elif os.environ.get("RUN_ENV") == "8082":
    CELERY_BROKER_URL = 'pyamqp://' + user + ':' + password + '@rabbit3/' + host
print("Celery Broker URL is: " + CELERY_BROKER_URL)

# Following line doesn't work: need to figure out how env variables are transferred in docker.
#CELERY_BROKER_URL = 'pyamqp://' + os.getenv("RABBITMQ_DEFAULT_USER") + ':' + os.getenv("RABBITMQ_DEFAULT_PASS") + 'neufeld@rabbit/' + os.getenv("RABBITMQ_DEFAULT_VHOST")

# Gmail API
GMAIL_SENDER = os.environ.get('GMAIL_SENDER')

# Default classifier path
# QIIME2 2020.6 SILVA 138
DEFAULT_CLASSIFIER_PATH="/pipeline/2020_06_classifier_silva138_NR99_V4V5.qza"