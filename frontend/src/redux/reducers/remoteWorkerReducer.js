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

const initialState = {
	inputSessionId: '',
	isWorkerRunning: false,
	isWorkerDone: false,
	isWorkerFailed: false,
	workerMessages: [], // to keep track of worker messages in the current session
}

export default function(state = initialState, action) {
	switch(action.type) {

		case WORKER_DONE:
			return {
				...state,
				isWorkerRunning: false,
				isWorkerDone: true
			}

		case WORKER_IN_PROGRESS:
			return {
				...state,
				isWorkerRunning: true
			}

		case WORKER_FAIL:
			return {
				...state,
				isWorkerRunning: false,
				isWorkerFailed: true,
			}

		case UPDATE_SESSION_ID:
			return {
				...state,
				inputSessionId: action.payload.inputSessionId
			}

		case UPDATE_WORKER_MESSAGES:
			return {
				...state,
				workerMessages: [ ...state.workerMessages, action.payload.message ],
			}

		case RESET_WORKER_MESSAGES:
			return {
				...state,
				workerMessages: initialState.workerMessages,
			}

		case RESET_SESSION:
			return {
				...state,
				inputSessionId: initialState.inputSessionId,
				isWorkerRunning: initialState.isWorkerRunning
			}

		case RESET_REMOTE_WORKER:
			return {
				...state,
				isWorkerRunning: initialState.isWorkerRunning,
				isWorkerDone: initialState.isWorkerDone,
				isWorkerFailed: initialState.isWorkerFailed,
				workerMessages: initialState.workerMessages,
			}

		default:
			return state;
	}
}