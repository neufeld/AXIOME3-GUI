/**
 * Filter "files array" by matching ID so that the file
 * can be uploaded to the correct field.
 * 
 * Input: Array of Objects (accessible via redux store)
 * Refer to selectFile function in src/redux/actions/uploadActions for more details

 * [{"selectedFile": FileObject, 
 *		"id": ID of upload field
 *	}, ...]
 *
 * Output: Filtered array
 */
const selectFileById = (id, files) => {
	const filtered = files.filter(file => file.id === id) || []

	return filtered
}

/**
 * Get the name of selected file.
 * 
 * Input: Output of selectFileById (i.e. array of File Objects)
 * "File object" can be of two types
 * 1. The one that is generated from <input type="file"> (Refer to Javascript File API)
 * 2. Custom file object generated from the backend code
 *
 * Custom file object has following properties
 * Name (file name), path (absolute path in the backend server), type (file/dir), ...
 *
 * Output: Name of a file
 */
const getSelectedFileName = (filteredFileArray) => {
	const name = filteredFileArray[0] ? filteredFileArray[0].selectedFile.name : ''

	return name
}

/**
* Get name of the file
*
* Input: Custom File Object as returned by the backend code (filetree_generator.py)
*/
const getFileDisplayName = (file) => {
	let displayName
	// If current directory, return nothing
	if(file.isRoot === true) {
		return
	}

	// If type is file, return the file name as it is
	if(file.type === "file") {
		displayName = file.name
		return displayName
	}

	// If parent dir (previous dir), display as double dots
	if(file.isParent === true) {
		displayName = '..'
	} else {
		displayName = file.name
	}

	// Append trailing slash to dir names
	displayName += '/'

	return displayName
}

const convertObj2Array = (obj) => {
	// If babel is installed
	//return Object.values(obj)

	// Otherwise
	if(obj) {
		return Object.keys(obj).map(k => obj[k])
	} else {
		return
	}		
}


export {
	selectFileById,
	getSelectedFileName,
	getFileDisplayName,
	convertObj2Array
}