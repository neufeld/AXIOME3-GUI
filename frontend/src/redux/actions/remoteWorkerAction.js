import { 
	WORKER_DONE,
	WORKER_IN_PROGRESS,
	WORKER_FAIL
} from '../types/types';

export const trackWorkerStatus = (message) => dispatch => {
	// Backend server will send 'Done!' if job is successfully complete
	if(message === "Done!") {
		dispatch({
			type: WORKER_DONE
		});
	} else if(message.includes("ERROR")) {
		dispatch({
			type: WORKER_FAIL
		})
	} else {
		dispatch({
			type: WORKER_IN_PROGRESS
		})
	}
	
}