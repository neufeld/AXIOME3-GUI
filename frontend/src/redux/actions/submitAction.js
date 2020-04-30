import axios from 'axios';
import {
	UPDATE_UID,
	UPDATE_PROGRESS,
	RESET_PROGRESS,
	IS_SUBMITTING,
	SUBMIT_SUCCESS,
	SUBMIT_FAIL 
} from '../types/types';

export const submitData = (formData, endpoint) => async dispatch => {
	dispatch({
		type: IS_SUBMITTING
	})

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
		const res = await axios(config);
		console.log(res)
		const uid = res.data;

		// Dispatch uid
		dispatch({
			type: UPDATE_UID,
			payload: {
				uid: uid
			}
		})

		// Dispatch submitSuccess
		dispatch({
			type: SUBMIT_SUCCESS
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

		console.log(err.response)	}
}

export const resetFileUploadProgress = () => dispatch => {
	dispatch({
		type: RESET_PROGRESS,
	})
}