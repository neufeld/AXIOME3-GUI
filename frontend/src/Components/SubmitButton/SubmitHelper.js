import axios from 'axios'

/**
 * Helper for form submission.
 *
 * Input:
 *	- e: Target event
 *	- formType: which form is being submitted? (e.g. InputUpload, Denoise, Analysis)
 */

 const handleSubmit = async (e, formType, selectedFiles, selectedOptions, submitData) => {
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

 	submitData(formData, endpoint);
 }

 export {
	handleSubmit
}