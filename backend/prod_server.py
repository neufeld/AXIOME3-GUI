from AXIOME3_app.app import create_app, socketio
import os

app = create_app()

if __name__ == '__main__':
	if os.environ.get("RUN_ENV") == "8081":
		socketio.run(app, host='0.0.0.0', port=5001)
	elif os.environ.get("RUN_ENV") == "8080":
		socketio.run(app, host='0.0.0.0', port=5000)
	elif os.environ.get("RUN_ENV") == "8082":
		socketio.run(app, host='0.0.0.0', port=5002)