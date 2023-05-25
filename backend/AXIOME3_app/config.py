import os
CELERY_BROKER_URL = 'UNDEFINED2'
if os.environ.get("RUN_ENV") == "test":
    CELERY_BROKER_URL = 'pyamqp://axiome3:neufeld@rabbit2/axiome3_host'
elif os.environ.get("RUN_ENV") == "official":
    CELERY_BROKER_URL = 'pyamqp://axiome3:neufeld@rabbit/axiome3_host'

# Following line doesn't work: need to figure out how env variables are transferred in docker.
#CELERY_BROKER_URL = 'pyamqp://' + os.getenv("RABBITMQ_DEFAULT_USER") + ':' + os.getenv("RABBITMQ_DEFAULT_PASS") + 'neufeld@rabbit/' + os.getenv("RABBITMQ_DEFAULT_VHOST")

# Gmail API
GMAIL_SENDER = os.environ.get('GMAIL_SENDER')

# Default classifier path
# QIIME2 2020.6 SILVA 138
DEFAULT_CLASSIFIER_PATH="/pipeline/2020_06_classifier_silva138_NR99_V4V5.qza"