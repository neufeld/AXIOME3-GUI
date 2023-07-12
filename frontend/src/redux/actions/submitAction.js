import axios from 'axios';
import {
	UPDATE_UID,
	UPDATE_PROGRESS,
	RESET_PROGRESS,
	IS_SUBMITTING,
	SUBMIT_SUCCESS,
	SUBMIT_FAIL,
	HANDLE_CLIENT_FAILURE,
	IS_ANALYSIS_SUBMIT,
	IS_RETRIEVE_SUBMIT,
	UPDATE_SESSION_ID,
	RESET_ANALYSIS,
	RESET_RETRIEVE,
	UPDATE_FORMTYPE,
	RESET_FORMTYPE,
	RESET_UID,
	RESET_SUBMIT,
	UPDATE_WORKER_QUEUE_STATUS, // RemoteWorker redux
	WORKER_FAIL, // RemoteWorker redux
	UPDATE_WORKER_MESSAGES, // RemoteWorker redux
} from '../types/types';

export const submitData = (formData, endpoint) => async dispatch => {
	dispatch({
		type: IS_SUBMITTING
	})

	const uuidV4 = formData.get('uuid');

	console.log("HERE submitAction: ")
	console.log(formData.get('formType'))

	try {
		// axios config
		const config = {
			url: endpoint,
			method: 'post',
			data: formData,
			onUploadProgress: (progress) => {
				const { loaded, total } = progress;
				const percentageProgress = Math.floor((loaded/total) * 100);
				dispatch({
					type: UPDATE_PROGRESS,
					payload: {
						id: 1,
						progress: percentageProgress
					}
				})
			}
		};

		// Receive UUID for each request server generated
		await axios(config);

		console.log("Endpoint is: " + endpoint)
		//don't create a new session ID if not datahandle/inputupload endpoint
		// if(endpoint.split("/")[-2] === "datahandle" && endpoint.split("/")[-1] === "inputupload"){
		// 	console.log("Creating new session: " + uuidV4)
		// 	// Dispatch uid
		// 	dispatch({
		// 		type: UPDATE_UID,
		// 		payload: {
		// 			uid: uuidV4
		// 		}
		// 	})
		// }
		// else{
		// 	console.log("Re-using session: " + )
		// }
		console.log(uuidV4)
		// Dispatch uid
		dispatch({
			type: UPDATE_UID,
			payload: {
				uid: uuidV4
			}
		})

		dispatch({
			type: UPDATE_WORKER_QUEUE_STATUS,
			payload: {
				isWorkerQueued: true,
			}
		})

		// Dispatch submitSuccess
		dispatch({
			type: SUBMIT_SUCCESS
		})

		dispatch({
			type: IS_ANALYSIS_SUBMIT
		})

		dispatch({
			type: UPDATE_SESSION_ID,
			payload: {
				inputSessionId: ''
			}
		})

	} catch (err) {
		dispatch({
			type: SUBMIT_FAIL
		})

		dispatch({
			type: WORKER_FAIL
		})
		
		if(err.response) {
			// Catching custom error codes
			const client_error = /\b[4][0-9]{2}\b/g;
			const server_error = /\b[5][0-9]{2}\b/g;

			if(err.response.status.toString().match(client_error)) {
				// This currently has no functional purpose... Maybe useful down the road?
				dispatch({
					type: HANDLE_CLIENT_FAILURE,
					payload: {
						failureMessage: err.response.data
					}
				})

				// need to update worker message to display it in the UI
				dispatch({
					type: UPDATE_WORKER_MESSAGES,
					payload: {
						message: err.response.data,
					}
				})
			} else if(err.response.status.toString().match(server_error)) {
				alert("Internal server error...")
			}
		}	else {
			alert(err)
			alert("Server unexpectedly failed...")
			
			console.log(err)
		}
	}
}

export const retrieveSession = (formData, endpoint) => async dispatch => {
	const uid = formData.get('session_id')

	try {
		const config = {
			url: endpoint,
			method: 'post',
			data: formData
		};

		await axios(config); 
		//axios call will either return a Response("Requested sesssion does NOT exist...", status=400)
		// or Response("Good", status=200)
		// if 400 then it's an error and will be caught by the catch(err). If 200, then the following two dispatches will be called

		console.log("Endpoint is: " + endpoint)
		
		dispatch({
			type: UPDATE_UID,
			payload: {
				uid: uid
			}
		})

		dispatch({
			type: IS_RETRIEVE_SUBMIT
		})

	} catch (err) {
		dispatch({
			type: SUBMIT_FAIL
		})

		dispatch({
			type: WORKER_FAIL
		})

		if(err.response) {
			// Catching custom error codes
			const client_error = /\b[4][0-9]{2}\b/g;
			const server_error = /\b[5][0-9]{2}\b/g;

			if(err.response.status.toString().match(client_error)) {
				// This currently has no functional purpose... Maybe useful down the road?
				dispatch({
					type: HANDLE_CLIENT_FAILURE,
					payload: {
						failureMessage: err.response.data
					}
				})

				// need to update worker message to display it in the UI
				dispatch({
					type: UPDATE_WORKER_MESSAGES,
					payload: {
						message: err.response.data,
					}
				})
			} else if(err.response.status.toString().match(server_error)) {
				alert("Internal server error...")
			}
		}	else {
			alert("Server unexpectedly failed...")
			console.log(err.response)
		}

		console.log(err.response)
	}
}

export const resetFileUploadProgress = () => dispatch => {
	dispatch({
		type: RESET_PROGRESS,
	})
}

export const resetAnalysis = () => dispatch => {
	dispatch({
		type: RESET_ANALYSIS
	})
}

export const resetRetrieve = () => dispatch => {
	dispatch({
		type: RESET_RETRIEVE
	})
}

export const updateFormType = (formType) => dispatch => {
	dispatch({
		type: UPDATE_FORMTYPE,
		payload: {
			formType: formType
		}
	})
}

export const resetFormType = () => dispatch => {
	dispatch({
		type: RESET_FORMTYPE,
	})
}

export const updateUid = (_id) => dispatch => {
	dispatch({
		type: UPDATE_UID,
		payload: {
			uid: _id,
		}
	})
}

export const resetUid = () => dispatch => {
	dispatch({
		type: RESET_UID,
	})
}

export const resetSubmit = () => dispatch => {
	dispatch({
		type: RESET_SUBMIT,
	})
}