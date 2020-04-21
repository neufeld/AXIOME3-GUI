import { GET_DOWNLOAD_PATH, RESET_DOWNLOAD_PATH, GET_UID } from './types';

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

export const getUid = (uid) => dispatch => {
	dispatch({
		type: GET_UID,
		payload: {
			uid: uid
		}
	})
}