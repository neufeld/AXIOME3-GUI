import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FolderTwoToneIcon from '@material-ui/icons/FolderTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

import { getFiles, selectFile } from '../../redux/actions/uploadAction'

/**
 * ADD DOCSTRING
 */
export function FileBrowseItem(props) {
	// Passed from parent as props (FileBrowseElementsMain.js)
	const { displayText, matchedFileName, file } = props

	// Redux actions
	const { getFiles, selectFile } = props

	// Redux state
	const { id } = props

	const onClickHandler = (file.type === "dir") 
													? 
													(() => { getFiles(id, file.path) })
													:
													(() => { selectFile(id, file) })

	const icon = (file.type === "dir") 
								? 
								<FolderTwoToneIcon className="icon" />
								:
								<DescriptionTwoToneIcon className="icon" />

	// This MUST be inline-styling;
	// One of the test cases requires it to be inline (as of Jan. 2020)
	let containerStyle;

	if(file.type === "file") {
		containerStyle = {
			background: (file.name === matchedFileName) ? "lightgray" : "white"
		}
	}

	return(
		<div
			className="clickable display-container"
			test-attr="clickForEvent"
			onClick={onClickHandler}
			style={containerStyle}
		>
			{icon}
			<p className="text">{displayText}</p>
		</div>
	)
}

const filePropType = {
  isRoot: PropTypes.bool,
  type: PropTypes.string.isRequired,
  path: PropTypes.string,
  name: PropTypes.string.isRequired,
  isParent: PropTypes.bool
 }

FileBrowseItem.propTypes = {
  id: PropTypes.number.isRequired,
  getFiles: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  file: PropTypes.shape(filePropType),
  matchedFileName: PropTypes.string
}

const mapStateToProps = state => ({
	id: state.upload.id
})

export default connect(mapStateToProps, { getFiles, selectFile })(FileBrowseItem)