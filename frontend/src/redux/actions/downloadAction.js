import { GET_DOWNLOAD_PATH, GET_INPUT_FIELD, RESET_DOWNLOAD_PATH } from './types';

export const updateDownloadPath = (path) => dispatch => {
	dispatch({
		type: GET_DOWNLOAD_PATH,
		payload: {
			downloadPath: path
		}
	})
}

export const resetDownloadPath = () => dispatch => {
	dispatch({
		type: RESET_DOWNLOAD_PATH
	})
}

export const updateInputField = (field) => dispatch => {
	dispatch({
		type: GET_INPUT_FIELD,
		payload: {
			inputField: field
		}
	})
}