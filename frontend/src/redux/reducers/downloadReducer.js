import { GET_DOWNLOAD_PATH, RESET_DOWNLOAD_PATH, GET_INPUT_FIELD } from '../types/types';

const initialState = {
	downloadPath: '',
	inputField: [],
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

		default:
			return state;
	}
}