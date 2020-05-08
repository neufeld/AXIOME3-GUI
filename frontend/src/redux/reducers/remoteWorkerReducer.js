import {
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL,
	UPDATE_INPUT_SESSION_ID,
	RESET_SESSION,
} from '../types/types';

const initialState = {
	isWorkerRunning: false,
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

		case UPDATE_INPUT_SESSION_ID:
			return {
				...state,
				inputSessionId: action.payload.inputSessionId
			}

		case RESET_SESSION:
			return {
				...state,
				inputSessionId: initialState.inputSessionId,
				isWorkerRunning: initialState.isWorkerRunning
			}

		default:
			return state;
	}
}