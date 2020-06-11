import sys
import os
from flask import Blueprint
from flask_socketio import join_room, leave_room, send, emit
from AXIOME3_app.app import socketio

blueprint = Blueprint("socketio_handlers", __name__)

@socketio.on('connect')
def on_connect():
	print("FROM BACKEND: socketio connected", file=sys.stderr)

@socketio.on('disconnect', namespace='/AXIOME3')
def on_disconnect():
	print("FROM BACKEND: socketio disconnected", file=sys.stderr)

@socketio.on('join', namespace='/AXIOME3')
def on_join(data):
	room = data['room']
	print("FROM BACKEND: room is {}".format(room), file=sys.stderr)
	join_room(room)
	send("Client joined the room, {}".format(room), room=room)

	# Retrive the latest task progress message specific to the room
	# For now, it will just read from a file
	# In the future, change to database call if needed (wayyy more scalable)
	task_progress_file = os.path.join('/output', room, 'task_progress.txt')
	if(os.path.exists(task_progress_file)):
		with open(task_progress_file, 'r') as fh:
			file_content = fh.readlines()
		message = ''.join(file_content)
	
		emit(
			"test",
			{'data': message},
			namespace='/AXIOME3',
			engineio_logger=True,
			room=room,
			logger=True,
			broadcase=True)

@socketio.on('leave', namespace='/AXIOME3')
def on_leave(data):
	room = data['room']
	print("Client left the room {}".format(room), file=sys.stderr)
	leave_room(room)
	send("Client left the room, {}".format(room), room=room)