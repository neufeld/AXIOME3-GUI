import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectFile } from '../../redux/actions/uploadAction'

/**
 * Adds radio button next to each item populated in the 
 * filebrowse table.  
 */
export function CheckBox(props) {
	// Props passed from the parent (FileBrowseElementMain.js)
	const { matchedFileName, file } = props

	// Redux actions
	const { selectFile } = props

	// Redux states
	const { id } = props

	let radioButton;
	if(file.type === "file") {
		radioButton = <input
										type="radio"
										name="filebrowse-radio"
										value={file.name}
										checked={file.name === matchedFileName}
										onChange={() => {selectFile(id, file)}}
									/>
	}

	return(
		<div className="checkbox">
			{radioButton}
		</div>
	)
}

const filePropType = {
  isRoot: PropTypes.bool,
  type: PropTypes.string,
  path: PropTypes.string,
  name: PropTypes.string.isRequired,
  isParent: PropTypes.bool
 }

CheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  selectFile: PropTypes.func.isRequired,
  file: PropTypes.shape(filePropType)
}

const mapStateToProps = state => ({
	id: state.upload.id
})

export default connect(mapStateToProps, { selectFile })(CheckBox)