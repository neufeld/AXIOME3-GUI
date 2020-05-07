import {
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL,
	RETRIEVE_STATUS,
	UPDATE_INPUT_SESSION_ID,
	RESET_INPUT_SESSION_ID
} from '../types/types';

const initialState = {
	isWorkerRunning: false,
	taskStatusFromRetrieve: '',
	inputSessionId: '',
}

export default function(state = initialState, action) {
	switch(action.type) {

		case WORKER_DONE:
			return {
				...state,
				isWorkerRunning: false
			}

		case WORKER_IN_PROGRESS:
			return {
				...state,
				isWorkerRunning: true
			}

		case WORKER_FAIL:
			return {
				...state,
				isWorkerRunning: false
			}

		case RETRIEVE_STATUS:
			return {
				...state,
				taskStatusFromRetrieve: action.payload.taskStatus
			}

		case UPDATE_INPUT_SESSION_ID:
			return {
				...state,
				inputSessionId: action.payload.inputSessionId
			}

		case RESET_INPUT_SESSION_ID:
			return {
				...state,
				inputSessionId: initialState.inputSessionId
			}

		default:
			return state;
	}
}