import axios from 'axios'

/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- e: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, formType, selectedFiles, options) => {
 	e.preventDefault();

 	const endpoint = '/datahandle/'

 	const formData = new FormData();

 	// Form Type
 	formData.append("formType", formType)

 	if(formType === "InputUpload") {
 		// Check if "empty" form
 		if(selectedFiles.length === 0) {
 			alert("Please upload the manifest file.")
 			return
 		}

 		//TODO
 		// Check there is only one element in selectedFiles?
 		formData.append("manifest", selectedFiles[0].selectedFile)
 	}

 	//TODO
 	// Check formData properly filled out?
 	try {
 		const res = await axios.post(endpoint, formData, {
	 		headers: {
	 			'Content-Type': 'multipart/form-data'
	 		}
	 	})
	 	console.log(res)
 	} catch (err) {
		console.log(err)
	}

 }

 export {
	handleSubmit
}