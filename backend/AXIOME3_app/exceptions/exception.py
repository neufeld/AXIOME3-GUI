"""
Custom exceptions are defined here
"""
# Custom exception
class CustomError(RuntimeError):
	def __init__(self, message, response):
		super().__init__(message)
		self.response = response