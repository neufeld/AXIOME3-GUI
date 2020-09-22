import httplib2
import os
import oauth2client
from oauth2client import client, tools, file
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from apiclient import errors, discovery
import mimetypes
from email.mime.image import MIMEImage
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase

from AXIOME3_app.exceptions.exception import AXIOME3Error
from flask import Response

SCOPES = 'https://www.googleapis.com/auth/gmail.send'
CLIENT_SECRET_FILE = 'credentials.json'
APPLICATION_NAME = 'AXIOME3 EMAIL'

def get_credentials():
	credential_dir = os.path.join('/backend')
	credential_path = os.path.join(credential_dir, 'gmail-python-email-send.json')

	# throw error if credential file not found
	if not(os.path.exists(credential_path)):
		error_message = "Gmail API credential file does not exist..."
		response = Response(error_message, status=400, mimetype='text/html')
		raise AXIOME3Error(error_message, response)

	store = oauth2client.file.Storage(credential_path)
	credentials = store.get()

	if not credentials or credentials.invalid:
		error_message = "Invalid or non existent Gmail API credentials..."
		response = Response(error_message, status=400, mimetype='text/html')
		raise AXIOME3Error(error_message, response)

	return credentials

def SendMessage(sender, to, subject, msgHtml=None, msgPlain=None):
	credentials = get_credentials()

	http = credentials.authorize(httplib2.Http())
	service = discovery.build('gmail', 'v1', http=http)

	message1 = CreateMessageHtml(sender, to, subject, msgHtml, msgPlain)
	result = SendMessageInternal(service, "me", message1)
	return result

def SendMessageInternal(service, user_id, message):
	message = (service.users().messages().send(userId=user_id, body=message).execute())

	return message

def CreateMessageHtml(sender, to, subject, msgHtml=None, msgPlain=None):
	msg = MIMEMultipart('alternative')
	msg['Subject'] = subject
	msg['From'] = sender
	msg['To'] = to
	if not (msgHtml or msgPlain):
		error_message = "Email body must be specified!"
		response = Response(error_message, status=400, mimetype='text/html')
		raise AXIOME3Error(error_message, response)
	if(msgPlain):
		msg.attach(MIMEText(msgPlain, 'plain'))
	if(msgHtml):
		msg.attach(MIMEText(msgHtml, 'html'))
	return {'raw': base64.urlsafe_b64encode(msg.as_bytes()).decode()}

def main():
	to = "danielm710@gmail.com"
	sender = "axiome333@gmail.com"
	subject = "Test Gmail"
	msgHtml = "Hi<br/>Html Email"
	msgPlain = "Hi\nPlain Email"
	SendMessage(sender, to, subject, msgHtml, msgPlain)