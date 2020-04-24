import { GET_DOWNLOAD_PATH, RESET_DOWNLOAD_PATH, GET_INPUT_FIELD, GET_UID } from '../actions/types';

const initialState = {
	downloadPath: '',
	inputField: [],
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
				...state,
				downloadPath: initialState.downloadPath
			}

		case GET_INPUT_FIELD:
			return {
				...state,
				inputField: action.payload.inputField
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