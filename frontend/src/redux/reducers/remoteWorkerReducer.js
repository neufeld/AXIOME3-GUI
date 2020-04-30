import {
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL
} from '../types/types';

const initialState = {
	isWorkerRunning: false
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

		default:
			return state;
	}
}