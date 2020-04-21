import { GET_DOWNLOAD_PATH, RESET_DOWNLOAD_PATH, GET_UID } from '../actions/types';

const initialState = {
	downloadPath: null,
	uid: ''
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_DOWNLOAD_PATH:
			return {
				...state,
				downloadPath: action.payload.downloadPath
			}

		case RESET_DOWNLOAD_PATH:
			return {
				...initialState
			}

		case GET_UID:
			return {
				...state,
				uid: action.payload.uid
			}

		default:
			return state;
	}
}