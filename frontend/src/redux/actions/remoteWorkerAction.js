import {
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL,
	UPDATE_SESSION_ID,
	UPDATE_WORKER_MESSAGES,
	RESET_WORKER_MESSAGES,
	RESET_SESSION,
	RESET_REMOTE_WORKER,
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
		type: UPDATE_SESSION_ID,
		payload: {
			inputSessionId: inputSessionId
		}
	})
}

export const updateWorkerMessages = (message) => dispatch => {
	dispatch({
		type: UPDATE_WORKER_MESSAGES,
		payload: {
			message: message,
		}
	})
}

export const resetWorkerMessages = () => dispatch => {
	dispatch({
		type: RESET_WORKER_MESSAGES
	})
}

export const resetSessionId = () => dispatch => {
	dispatch({
		type: RESET_SESSION
	})
}

export const resetRemoteWorker = () => dispatch => {
	dispatch({
		type: RESET_REMOTE_WORKER
	})
}