import { 
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL,
	UPDATE_INPUT_SESSION_ID,
	RESET_SESSION,
} from '../types/types';

export const trackWorkerStatus = (message) => dispatch => {
	// Initial state for status message
	if(message === '') {
		dispatch({
			type: RESET_SESSION
		})
		return
	}

	// Backend server will send 'Done!' if job is successfully complete
	if(message === "Done!") {
		dispatch({
			type: WORKER_DONE
		});
	} else if(message.toLowerCase().includes("error")) {
		dispatch({
			type: WORKER_FAIL
		})
	} else {
		dispatch({
			type: WORKER_IN_PROGRESS
		})
	}
	
}

export const updateInputSessionId = (inputSessionId) => dispatch => {
	dispatch({
		type: UPDATE_INPUT_SESSION_ID,
		payload: {
			inputSessionId: inputSessionId
		}
	})
}

export const resetInputSessionId = () => dispatch => {
	dispatch({
		type: RESET_SESSION
	})
}