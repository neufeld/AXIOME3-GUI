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

 	const endpoint = '/submit'

 	const formData = new FormData();

 	// Form Type
 	formData.append("formType", formType)

 	if(formType === "InputUpload") {
 		// Check if "empty" form
 		if(selectedFiles.length === 0) {
 			alert("Form not completed. Please upload the manifest file.")
 			return
 		}

 		// Check there is only one element in selectedFiles?
 		//TODO

 		formData.append("manifest", selectedFiles[0].selectedFile)
 	}

 	// Check formData properly filled out?
 	//TODO

 	try {
 		const res = await axios.post(endpoint, formData, {
	 		headers: {
	 			'Content-Type': 'multipart/form-data'
	 		}
	 	})
 	} catch (err) {
		console.log(err)
	}

 }

 export {
	handleSubmit
}