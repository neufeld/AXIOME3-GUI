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

from AXIOME3_app.tasks.utils import (
	generate_html,
)

class EmailNotification():
	def __init__(self, task_id, credential_file_name='gmail-python-email-send.json', credential_dir='/backend'):
		# send scope
		self.task_id = task_id
		self.scopes = 'https://www.googleapis.com/auth/gmail.send'

		self.credential = os.path.join(credential_dir, credential_file_name)

		self.email_subject = "AXIOME3 task result"

		#self.a = 'gmail-python-email-send.json'
		#self.client_secret_file = 'credentials.json'
		#self.application_name = 'AXIOME3 EMAIL'

	def _get_credentials(self):
		# throw error if credential file not found
		if not(os.path.exists(self.credential)):
			error_message = "Gmail API credential file does not exist..."
			response = Response(error_message, status=400, mimetype='text/html')
			raise AXIOME3Error(error_message, response)

		store = oauth2client.file.Storage(self.credential)
		credentials = store.get()

		if not credentials or credentials.invalid:
			error_message = "Invalid or non existent Gmail API credentials..."
			response = Response(error_message, status=400, mimetype='text/html')
			raise AXIOME3Error(error_message, response)

		return credentials

	def send_email(self, sender, recipient, subject, task_name, message):
		if(recipient is not None):
			credentials = self._get_credentials()

			http = credentials.authorize(httplib2.Http())
			# disable cache? thie may be detrimental to performance...
			# Keeps getting warning if enable cache
			service = discovery.build('gmail', 'v1', http=http, cache_discovery=False)
			#service = discovery.build('gmail', 'v1', http=http)

			html_message = generate_html(self.task_id, message, task_name)
			email_message = self._create_message_html(sender, recipient, subject, html_message)
			result = self._send_email_internal(service, "me", email_message)

			return result

	def _send_email_internal(self, service, user_id, message):
		message = (service.users().messages().send(userId=user_id, body=message).execute())

		return message

	def _create_message_html(self, sender, to, subject, msgHtml=None, msgPlain=None):
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

