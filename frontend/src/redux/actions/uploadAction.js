import { GET_UPLOAD_FIELD, GET_FILES, SELECT_FILE } from './types';
import axios from 'axios'

export const getUploadField = (data) => dispatch => {

	dispatch({
		type: GET_UPLOAD_FIELD,
		payload: {
			uploadField: data
		}
	})
}

export const getFiles = (id, path='./') => async dispatch => {
	
	const data = JSON.stringify({path: path})
	try {
		const res = await axios.post('/filebrowse', data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		dispatch({
			type: GET_FILES,
			payload: {
				files: res.data,
				id: id
			}
		})

	} catch (err) {
		console.log(err)
	}
}

export const selectFile = (id, file) => (dispatch, getState) => {
	// if file is empty, return
	if(!file) { return }

	const newSelectedFiles = [ ...getState().upload.selectedFiles ];
	let selectedFile;

	// If nothing in the array, add
	if(newSelectedFiles.length === 0) {
		selectedFile = {
			selectedFile: file,
			id: id
		}
		newSelectedFiles.push(selectedFile)
		
	} else {
		var doesIdExist = false
		// Check if same ID already exists
		newSelectedFiles.forEach(f => {
			if(f.id === id) { 
				// Replace existing content
				f.selectedFile = file
				doesIdExist = true
			}
		})

		if(doesIdExist === false) { // Add new item if ID does not exist
			selectedFile = {
				selectedFile: file,
				id: id
			}
			newSelectedFiles.push(selectedFile)
		}
	}

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
		type: SELECT_FILE,
		payload: {
			selectedFiles: emptyArr
		}
	})
}

export const emptyFiles = () => (dispatch) => {
	const emptyObj = {}

	dispatch({
		type: GET_FILES,
		payload: {
			files: emptyObj
		}
	})
}