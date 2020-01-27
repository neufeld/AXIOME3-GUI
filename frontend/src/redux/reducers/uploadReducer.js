import { GET_UPLOAD_FIELD, GET_FILES, SELECT_FILE } from '../actions/types';

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

		default:
			return state;
	}
}