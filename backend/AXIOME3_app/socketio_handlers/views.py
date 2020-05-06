import sys
from flask import Blueprint
from AXIOME3_app.app import socketio

blueprint = Blueprint("socketio_handlers", __name__)

@socketio.on('connect')
def on_connect():
	print("FROM BACKEND: socketio connected", file=sys.stderr)

@socketio.on('disconnect')
def on_disconnect():
	print("FROM BACKEND: socketio disconnected", file=sys.stderr)