from flask_cors import CORS, cross_origin
from app import app
from filebrowse import routes

app.register_blueprint(routes.filebrowse_bp)
CORS(app, expose_headers='Authorization')