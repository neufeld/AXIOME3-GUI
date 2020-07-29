import uuid from 'uuid';

import {
	INPUT_UPLOAD_FORMTYPE,
	DENOISE_FORMTYPE,
	ANALYSIS_FORMTYPE,
	PCOA_FORMTYPE,
	BUBBLEPLOT_FORMTYPE,
	TRIPLOT_FORMTYPE,
} from '../../misc/FormTypeConfig';
/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- formType: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, formType, selectedFiles, selectedOptions, uploadField, submitData) => {
 	e.preventDefault();

 	const uuidV4 = uuid.v4()
 	const endpoint = '/datahandle/' + formType.toLowerCase();
 	const formData = new FormData();

 	// Form Type
 	formData.append("formType", formType)

 	// UUID V4
 	formData.append("uuid", uuidV4)

 	// Check if "empty" form
 	if(selectedFiles.length === 0) {
 		alert("Please upload the input file.")
 		return
 	}
 	console.log(selectedFiles)

 	// Add options
 	// Key is same as the option label
 	Object.keys(selectedOptions).forEach(k => {
 		formData.append(k, selectedOptions[k])
 	});

 	selectedFiles.forEach(fileObj => {
 		var _id = fileObj.id;
 		var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 		uploadField.forEach(uploadObj => {
 			if(_id === uploadObj.id) {
 				formData.append(uploadObj.name, _file);
 			}
 		})
 	})
 	/*
 	if(formType === INPUT_UPLOAD_FORMTYPE) {
 		//TODO
 		// Check there is only one element in selectedFiles?
 		var fileObj = selectedFiles[0];
 		var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 		formData.append("manifest", _file)
 	} else if(formType === DENOISE_FORMTYPE) {
 		var fileObj = selectedFiles[0];
 		var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 		formData.append("demultiplexed", _file)
 	} else if(formType === ANALYSIS_FORMTYPE) {
 		selectedFiles.forEach(fileObj => {
 			var _id = fileObj.id;
 			var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 			if(_id === 0) {
 				formData.append("feature_table", _file)
 			} else if(_id === 1) {
 				formData.append("rep_seqs", _file)
 			} else if(_id === 2) {
 				formData.append("metadata", _file)
 			}
 		})
 	} else if(formType === PCOA_FORMTYPE) {
 		selectedFiles.forEach(fileObj => {
 			var _id = fileObj.id;
 			var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 			uploadField.forEach(uploadObj => {
 				if(_id === uploadObj.id) {
 					formData.append(uploadObj.name, _file);
 				}
 			})
 		})
 	} else if(formType === BUBBLEPLOT_FORMTYPE) {
 		selectedFiles.forEach(fileObj => {
 			var _id = fileObj.id;
 			var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 			if(_id === 0) {
 				formData.append("feature_table_qza", _file)
 			} else if(_id === 1) {
 				formData.append("taxonomy_qza", _file)
 			}
 		})
 	} else if(formType === TRIPLOT_FORMTYPE) {
 		selectedFiles.forEach(fileObj => {
 			var _id = fileObj.id;
 			var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 			if(_id === 0) {
 				formData.append("feature_table_qza", _file)
 			} else if(_id === 1) {
 				formData.append("taxonomy_qza", _file)
 			} else if(_id === 2) {
 				formData.append("metadata", _file)	
 			} else if(_id === 3) {
 				formData.append("environmental_metadata", _file)
 			}
 		})
 	} else {
 		alert(`${formType} is not valid...`)
 	}
 	*/
 	submitData(formData, endpoint);

 }

 const handleRetrieveSession = async (e, sessionID, retrieveSession) => {
 		e.preventDefault();

 		const endpoint = '/session_retrieve/';

 		if(sessionID === '') {
 			alert("Please enter session ID!")

 			return
 		}

 		const formData = new FormData();

 		formData.append("session_id", sessionID)

 		retrieveSession(formData, endpoint)
 }

 export {
	handleSubmit,
	handleRetrieveSession
}