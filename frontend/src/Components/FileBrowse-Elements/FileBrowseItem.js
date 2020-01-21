import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FolderTwoToneIcon from '@material-ui/icons/FolderTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

import { getFiles, selectFile } from '../../redux/actions/uploadAction'

/**
* ADD DOCSTRING
*/
function FileBrowseItem(props) {
	const { displayText, matchedFileName, file, id, getFiles, selectFile } = props

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

	let containerStyle
	if(file.type === "file") {
		containerStyle = {
			background: (file.name === matchedFileName) ? "lightgray" : "white"
		}
	}

	return(
		<div
			className="clickable display-container"
			onClick={onClickHandler}
			style={containerStyle}
		>
			{icon}
			<p className="text">{displayText}</p>
		</div>
	)
}

FileBrowseItem.propTypes = {
  id: PropTypes.number.isRequired,
  getFiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	id: state.upload.id
})

export default connect(mapStateToProps, { getFiles, selectFile })(FileBrowseItem)