from flask_cors import CORS, cross_origin
from app import app
from filebrowse import routes as filebrowse_routes
from datahandle import routes as datahandle_routes

app.register_blueprint(filebrowse_routes.filebrowse_bp)
app.register_blueprint(datahandle_routes.data_handle_bp)

CORS(app, expose_headers='Authorization')