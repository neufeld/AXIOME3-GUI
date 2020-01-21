from app import app

@app.route('/')
@app.route('/index')
def index():
	return "Hello World"

#/*
#import os
#from flask import Flask, flash, request, redirect, url_for
#from werkzeug.utils import secure_filename
#
#UPLOAD_FOLDER = '/home/danielm710/tmp'
#ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'js'}
#
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#def allowed_file(filename):
#	return '.' in filename and \
#		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
#@app.route('/upload', methods=['POST'])
#def upload_file():
#	# check if the post request has the file part
#	if 'file' not in request.files:
#		flash('No file part')
#		return redirect(request.url)
#	file = request.files['file']
#	# if user does not select file, browser also
#	# submit an empty part without filename
#	if file.filename == '':
#		flash('No selected file')
#		return redirect(request.url)
#	if file and allowed_file(file.filename):
#		filename = secure_filename(file.filename)
#		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#
#	app.logger.info(file)
#	return "done"
