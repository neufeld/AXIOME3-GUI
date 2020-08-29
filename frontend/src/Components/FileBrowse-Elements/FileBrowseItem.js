import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FolderTwoToneIcon from '@material-ui/icons/FolderTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

import { getFiles, selectFile } from '../../redux/actions/uploadAction'

import { FILEBROWSE_ENDPOINT } from '../../misc/EndpointConfig';
import { ENDPOINT_ROOT } from '../../misc/apiConfig';

export const FileBrowseTextToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#FFFFFF',
		color: 'rgba(0, 0, 0, 1)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

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

	// Endpoint
	const fileBrowseEndpoint = ENDPOINT_ROOT + FILEBROWSE_ENDPOINT

	const onClickHandler = (file.type === "dir") 
													? 
													(() => { getFiles(id, fileBrowseEndpoint, file.path) })
													:
													(() => { selectFile(id, file) })

	const icon = (file.type === "dir") 
								? 
								<FolderTwoToneIcon className="filebrowse-icon" />
								:
								<DescriptionTwoToneIcon className="filebrowse-icon" />

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
			className="clickable filebrowse-display-container"
			test-attr="clickForEvent"
			onClick={onClickHandler}
			style={containerStyle}
		>
			{icon}
			<FileBrowseTextToolTip title={displayText} placement="top-start" arrow>
				<p className="filebrowse-text">{displayText}</p>
			</FileBrowseTextToolTip>
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