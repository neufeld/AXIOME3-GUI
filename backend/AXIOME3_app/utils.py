"""
This is strictly for flask related util (helper) functions.
For example, error handling.
"""
from flask import Response
from flask import current_app

from AXIOME3_app.exceptions.exception import CustomError

# Messages
from AXIOME3_app.messages.message import (
	INTERNAL_SERVER_ERROR_MESSAGE
)
import sys
def responseIfError(func, **kwargs):
	"""
	Executes a custom function.
	If error, raises an exception with appropriate response.

	Input:
		func: A function to be run. MUST return status code and result (of any type).
		kwargs: keyword arguments to be passed to the custom function.
	"""
	code, result = func(**kwargs)
	if(code != 200):
		# Log error message
		current_app.logger.error(result)

		if(str(code).startswith("5")):
			response = Response(INTERNAL_SERVER_ERROR_MESSAGE, status=code, mimetype='text/html')

		elif(str(code).startswith("4")):
			# Remove "/hostfs" if any
			result = result.replace("/hostfs", "")
			response = Response(result, status=code, mimetype='text/html')

		raise CustomError(result, response)

	return result