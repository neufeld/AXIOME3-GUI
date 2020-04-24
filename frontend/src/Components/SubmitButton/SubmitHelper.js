import axios from 'axios'

/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- formType: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, formType, selectedFiles, selectedOptions, getUid) => {
 	e.preventDefault();

 	const endpoint = '/datahandle/'
 	const formData = new FormData();

 	// Form Type
 	formData.append("formType", formType)

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
 		formData.append("manifest", selectedFiles[0].selectedFile)
 	} else if(formType === "Denoise") {
 		formData.append("demultiplexed", selectedFiles[0].selectedFile)
 	}

 	try {
 		// Receive UUID for each request server generated
 		const res = await axios.post(endpoint, formData, {
	 		headers: {
	 			'Content-Type': 'multipart/form-data'
	 		}
	 	})
	 	console.log(res)
	 	const uid = res.data;

	 	getUid(uid);

 	} catch (err) {
 		if(err.response) {
 			// Catching custom error codes
 			const client_error = /\b[4][0-9]{2}\b/g;
 			const server_error = /\b[5][0-9]{2}\b/g;
 			if(err.response.status.toString().match(client_error)) {
 				alert(err.response.data)
 			} else if(err.response.status.toString().match(server_error)) {
 				alert("Internal server error...")
 			}
 		}
		else {
			alert("Server unexpectedly failed...")
			console.log(err.response)
		}
 		console.log(err.response)
	}

 }

 export {
	handleSubmit
}