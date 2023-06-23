from flask_socketio import SocketIO

class WebSocket(object):
	def __init__(self, messageQueueURL, room, channel='test', namespace='/AXIOME3'):
		self.room = room
		self.namespace = namespace
		self.channel = channel

		self.socketio = SocketIO(message_queue=messageQueueURL)

	def emit(self, message):
		self.socketio.emit(
			self.channel,
			{'data': message},
			namespace=self.namespace,
			room=self.room,
			logger=True,
			async_mode='threading', 
			broadcast=True,
			engineio_logger=True
		)