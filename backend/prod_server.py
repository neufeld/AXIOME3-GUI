from AXIOME3_app.app import create_app, socketio
import os

app = create_app()

if __name__ == '__main__':
	if os.environ.get("RUN_ENV") == "test":
		socketio.run(app, host='0.0.0.0', port=5001)
	elif os.environ.get("RUN_ENV") == "official":
		socketio.run(app, host='0.0.0.0', port=5000)