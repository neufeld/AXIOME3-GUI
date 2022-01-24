import os
CELERY_BROKER_URL = 'pyamqp://axiome3:neufeld@rabbit/axiome3_host'
# Gmail API
GMAIL_SENDER = os.environ.get('GMAIL_SENDER')

# Default classifier path
# QIIME2 2020.6 SILVA 138
DEFAULT_CLASSIFIER_PATH="/pipeline/AXIOME3/2020_06_classifier_silva138_NR99_V4V5.qza"