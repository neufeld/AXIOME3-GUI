// Check if object is empty
const isObjectEmpty = (obj) => {
	let isEmpty;
	
	if(typeof obj === "undefined") {
		isEmpty = true;
	} else if(Object.keys(obj).length === 0 && obj.constructor === Object) {
		isEmpty = true;
	} else {
		isEmpty = false;
	}

	return isEmpty
}

/**
 * Helper for selectFile (in uploadAction.js)
 * Update selected files given ID and file
 * 
 * Input
 * id: ID of the upload field file is being selected for
 * file: File object (as returned by either custom backend code or Javascript file API)
 * prevSelectedFiles: selected files in the previous state
 */
export const updateSelectedFiles = (id, file, prevSelectedFiles) => {
	// if file is empty, return prev state
	if(isObjectEmpty(file)) { return prevSelectedFiles }

	let selectedFile;

	// If nothing in the array, add
	if(prevSelectedFiles.length === 0) {
		selectedFile = {
			selectedFile: file,
			id: id
		};
		prevSelectedFiles.push(selectedFile);
		
	} else {
		var doesIdExist = false;
		// Check if same ID already exists
		prevSelectedFiles.forEach(f => {
			if(f.id === id) { 
				// Replace existing content
				f.selectedFile = file;
				doesIdExist = true;
			}
		})

		if(doesIdExist === false) { // Add new item if ID does not exist
			selectedFile = {
				selectedFile: file,
				id: id
			}
			prevSelectedFiles.push(selectedFile);
		}
	}

	return prevSelectedFiles
}