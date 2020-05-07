import uuid from 'uuid';
/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- formType: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, formType, selectedFiles, selectedOptions, submitData) => {
 	e.preventDefault();

 	const uuidV4 = uuid.v4()
 	const endpoint = '/datahandle/'
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

 	if(formType === "InputUpload") {
 		//TODO
 		// Check there is only one element in selectedFiles?
 		var fileObj = selectedFiles[0];
 		var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 		formData.append("manifest", _file)
 	} else if(formType === "Denoise") {
 		var fileObj = selectedFiles[0];
 		var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 		formData.append("demultiplexed", _file)
 	} else if(formType === "Analysis") {
 		selectedFiles.forEach(fileObj => {
 			var _id = fileObj.id;
 			var _file = fileObj.selectedFile.misc ? fileObj.selectedFile.path : fileObj.selectedFile;

 			if(_id === 0) {
 				formData.append("feature_table", _file)
 				console.log(fileObj)
 			} else if(_id === 1) {
 				formData.append("rep_seqs", _file)
 				console.log(fileObj)
 			} else if(_id === 2) {
 				formData.append("metadata", _file)
 				console.log(fileObj)
 			}
 		})
 	}
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