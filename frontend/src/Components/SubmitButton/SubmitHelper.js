import uuid from 'uuid';

import {
	MAIN_FORM_SUBMISSION_ENDPOINT,
	SESSION_RETRIEVE_FORM_SUBMISSION_ENDPOINT,
} from '../../misc/EndpointConfig';

import { ENDPOINT_ROOT } from '../../misc/apiConfig';
/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- formType: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, userSessionId, formType, selectedFiles, selectedOptions, uploadField, submitData) => {
 	e.preventDefault();

	console.log("userSessionId is: " + userSessionId)
	let uuidV4 = uuid.v4()
	if (userSessionId){
		uuidV4 = userSessionId
	}
	console.log(uuidV4)
 	const endpoint = ENDPOINT_ROOT + MAIN_FORM_SUBMISSION_ENDPOINT + '/' + formType.toLowerCase();
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
 	submitData(formData, endpoint);

 }

 const handleRetrieveSession = async (e, sessionID, retrieveSession) => {
 		e.preventDefault();

 		const endpoint = ENDPOINT_ROOT + SESSION_RETRIEVE_FORM_SUBMISSION_ENDPOINT;

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