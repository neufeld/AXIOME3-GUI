import {
	GET_UPLOAD_FIELD,
	GET_FILES,
	SELECT_FILE, 
	RESET_SELECTED_FILES,
	RESET_UPLOAD,
} from '../types/types';

const initialState = {
	uploadField: [],
	files: [],
	selectedFiles: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_UPLOAD_FIELD:
			return {
				...state,
				uploadField: action.payload.uploadField
			}

		case GET_FILES:
			return {
				...state,
				files: action.payload.files,
				id: action.payload.id
			}

		case SELECT_FILE:
			return {
				...state,
				selectedFiles: action.payload.selectedFiles,
			}

		case RESET_SELECTED_FILES:
			return {
				...state,
				selectedFiles: initialState.selectedFiles
			}

		case RESET_UPLOAD:
			return {
				...initialState
			}

		default:
			return state;
	}
}