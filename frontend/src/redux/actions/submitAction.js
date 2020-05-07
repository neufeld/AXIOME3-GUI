import axios from 'axios';
import {
	UPDATE_UID,
	UPDATE_PROGRESS,
	RESET_PROGRESS,
	IS_SUBMITTING,
	SUBMIT_SUCCESS,
	SUBMIT_FAIL,
	RETRIEVE_STATUS,
	HANDLE_CLIENT_FAILURE,
	IS_ANALYSIS_SUBMIT,
	IS_RETRIEVE_SUBMIT,
	UPDATE_INPUT_SESSION_ID,
} from '../types/types';

export const submitData = (formData, endpoint) => async dispatch => {
	dispatch({
		type: IS_SUBMITTING
	})

	const uuidV4 = formData.get('uuid');

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

		// Dispatch uid
		dispatch({
			type: UPDATE_UID,
			payload: {
				uid: uuidV4
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
			type: UPDATE_INPUT_SESSION_ID,
			payload: {
				inputSessionId: ''
			}
		})

	} catch (err) {
		dispatch({
			type: SUBMIT_FAIL
		})
		
		if(err.response) {
			// Catching custom error codes
			const client_error = /\b[4][0-9]{2}\b/g;
			const server_error = /\b[5][0-9]{2}\b/g;

			if(err.response.status.toString().match(client_error)) {
				alert(err.response.data)
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

export const retrieveSession = (formData, endpoint) => async dispatch => {
	const uid = formData.get('session_id')

	try {
		const config = {
			url: endpoint,
			method: 'post',
			data: formData,
		};

		const res = await axios(config);
		
		dispatch({
			type: RETRIEVE_STATUS,
			payload: {
				taskStatus: res.data
			}
		})

		dispatch({
			type: IS_RETRIEVE_SUBMIT
		})

		dispatch({
			type: UPDATE_UID,
			payload: {
				uid: uid
			}
		})

	} catch (err) {		
		if(err.response) {
			// Catching custom error codes
			const client_error = /\b[4][0-9]{2}\b/g;
			const server_error = /\b[5][0-9]{2}\b/g;

			if(err.response.status.toString().match(client_error)) {
				alert(err.response.data)
				dispatch({
					type: HANDLE_CLIENT_FAILURE,
					payload: {
						failureMessage: err.response.data
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