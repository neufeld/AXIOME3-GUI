import os
# Redis
#CELERY_BROKER_URL='redis://redis:6379/0'
#CELERY_RESULT_BACKEND='redis://redis:6379/0'
# RabbitMQ
#CELERY_BROKER_URL='pyamqp://admin:mypass@rabbit//'
#CELERY_RESULT_BACKEND='rpc://'

CELERY_BROKER_URL='pyamqp://axiome3:neufeld@rabbit/axiome3_host'
CELERY_RESULT_BACKEND='rpc://'

# Flask Mail
MAIL_USERNAME="apikey"
MAIL_SERVER="smtp.sendgrid.net"
MAIL_DEFAULT_SENDER=os.environ.get('MAIL_DEFAULT_SENDER')
MAIL_PASSWORD=os.environ.get('SENDGRID_API_KEY')
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False

# Default classifier path
# QIIME2 2020.6 SILVA 138
DEFAULT_CLASSIFIER_PATH="/pipeline/AXIOME3/2020_06_classifier_silva138_NR99_V4V5.qza"