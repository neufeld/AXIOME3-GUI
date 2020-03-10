"""
This is strictly for flask related util (helper) functions.
For example, error handling.
"""
from flask import Response

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
		func: A function that returns status code and result.
		kwargs: keyword arguments to be passed to the custom function.
	"""
	code, result = func(**kwargs)
	if(code != 200):
		if(str(code).startswith("5")):
			response = Response(INTERNAL_SERVER_ERROR_MESSAGE, status=code, mimetype='text/html')

		elif(str(code).startswith("4")):
			response = Response(result, status=code, mimetype='text/html')

		raise CustomError(result, response)

	return result