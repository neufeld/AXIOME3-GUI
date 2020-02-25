import os
from flask import Flask
# To resolve CORS issues
from flask_cors import CORS, cross_origin
# Import different applications
from AXIOME3_app import filebrowse
from AXIOME3_app import datahandle
# Import extension packages
from AXIOME3_app.extensions import celery

def create_app(testing=False):
	"""
	Application factory. Create application here.
	"""
	app = Flask(__name__)
	app.config.from_object("AXIOME3_app.config")

	if testing is True:
		app.config["TESTING"] = True

	# Register blueprints
	register_blueprints(app)

	# Initialize celery app?
	init_celery(app)

	return app

def register_blueprints(app):
	app.register_blueprint(filebrowse.views.blueprint)
	app.register_blueprint(datahandle.views.blueprint)

def init_celery(app=None):
	"""
	Initialize Celery App
	"""
	app = app or create_app()

	# Set celery worker configuration
	# Use this to load config information from flask config file
	celery.conf.broker_url = app.config["CELERY_BROKER_URL"]
	celery.conf.result_backend = app.config["CELERY_RESULT_BACKEND"]

	# Or from environment variables
	#celery.conf.broker_url = os.environ["CELERY_BROKER_URL"]
	#celery.conf.result_backend = os.environ["CELERY_RESULT_BACKEND"]

	# Task routes
	celery.conf.task_routes = {'pipeline.run.*': {'queue': 'pipeline'}}
	#celery.conf.update(app.config)

	class ContextTask(celery.Task):
		"""Make celery tasks work with Flask app context"""

		def __call__(self, *args, **kwargs):
			with app.app_context():
				return self.run(*args, **kwargs)

	celery.Task = ContextTask

	return celery