import eventlet
eventlet.monkey_patch()

import os
import logging
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from werkzeug.debug import DebuggedApplication
# Import extension packages
from AXIOME3_app.extensions import celery

# Initialize socketio instance here to avoid circulr import
socketio = SocketIO(cors_allowed_origins='*')

# Import different applications
from AXIOME3_app import filebrowse
from AXIOME3_app import datahandle
from AXIOME3_app import socketio_handlers
from AXIOME3_app import session_retrieve
from AXIOME3_app.report import pcoa
from AXIOME3_app.report import taxonomy
from AXIOME3_app.report import alpha_diversity

#socketio = SocketIO(cors_allowed_origins='*')

def create_app(testing=False, debug=False, development=False):
	"""
	Application factory. Create application here.
	"""
	app = Flask(__name__)
	app.debug = debug
	app.config.from_object("AXIOME3_app.config")

	if development is True:
		app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

	if testing is True:
		app.config["TESTING"] = True

	# Register blueprints
	register_blueprints(app)

	# Initialize celery app?
	init_celery(app)

	# Initialize logger
	formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
	fh = logging.FileHandler('/log/backend.log', mode='a')
	fh.setLevel(level=logging.WARNING)
	fh.setFormatter(formatter)
	app.logger.addHandler(fh)

	# Initialize Socket.IO
	socketio.init_app(app, message_queue=app.config["CELERY_BROKER_URL"], engineio_logger=True)

	# CORS
	#CORS(app)

	return app

def register_blueprints(app):
	# SocketIO blueprint
	app.register_blueprint(socketio_handlers.views.blueprint)
	app.register_blueprint(session_retrieve.views.blueprint)
	# Browsing files from backend server
	app.register_blueprint(filebrowse.views.blueprint)
	# Upload data handle blueprint
	app.register_blueprint(datahandle.views.blueprint)
	# Report related blueprints
	app.register_blueprint(pcoa.views.blueprint)
	app.register_blueprint(taxonomy.views.blueprint)
	app.register_blueprint(alpha_diversity.views.blueprint)

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