from celery import Celery
from flask_mail import Mail

celery = Celery()
mail = Mail()