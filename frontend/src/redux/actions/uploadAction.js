import {
	GET_UPLOAD_FIELD,
	GET_FILES,
	SELECT_FILE,
	RESET_SELECTED_FILES
} from '../types/types';
import axios from 'axios'

// Helper functions
import { updateSelectedFiles } from './actionHelper'

export const getUploadField = (data) => dispatch => {

	dispatch({
		type: GET_UPLOAD_FIELD,
		payload: {
			uploadField: data
		}
	})
}

export const getFiles = (id, path='/hostfs') => async dispatch => {
	
	const data = JSON.stringify({path: path})
	try {
		const res = await axios.post('/filebrowse/', data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		dispatch({
			type: GET_FILES,
			payload: {
				files: res.data.files,
				id: id
			}
		})

	} catch (err) {
		console.log(err)
	}
}

export const selectFile = (id, file) => (dispatch, getState) => {
	const prevSelectedFiles = [ ...getState().upload.selectedFiles ];
	
	const newSelectedFiles = updateSelectedFiles(id, file, prevSelectedFiles)

	dispatch({
		type: SELECT_FILE,
		payload: {
			selectedFiles: newSelectedFiles,
		}
	})
}

export const emptySelectedFiles = () => (dispatch) => {
	const emptyArr = []

	dispatch({
		type: RESET_SELECTED_FILES
	})
}

export const emptyFiles = () => (dispatch) => {
	const emptyObj = []

	dispatch({
		type: GET_FILES,
		payload: {
			files: emptyObj
		}
	})
}