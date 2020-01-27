import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FolderTwoToneIcon from '@material-ui/icons/FolderTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

import'./FileBrowse.css'
import { selectFileById, getSelectedFileName, getFileDisplayName } from './FileBrowseHelper'
import { getFiles, selectFile } from '../../redux/actions/uploadAction'
import HeaderBar from './HeaderBar.js'
import FileBrowseItem from './FileBrowseItem'
import CheckBox from './CheckBox'

export function populateList(id, files, selectedFiles) {
	const idMatchedFileArray = selectFileById(id, selectedFiles)
	const matchedFileName = getSelectedFileName(idMatchedFileArray)

	const fileList = files.map(file => {
		const filebrowseInnerId = id.toString() + "_" + file.name

		const displayText = getFileDisplayName(file)
		// Return if displayText is undefined or empty string
		if(!displayText) {return}

		return(
			<div className="filebrowse-inner" key={filebrowseInnerId}>
				<FileBrowseItem
					displayText={displayText}
					matchedFileName={matchedFileName}
					file={file}
				/>
				<CheckBox
					matchedFileName={matchedFileName}
					file={file} 
				/>
			</div>
		)		
	})

	return fileList
}

export function FileBrowseElementsMain(props) {
	// Redux states
	const { id, files = [] } = props

	// Redux action
	const { selectedFiles } = props

	const fileData = populateList(id, files, selectedFiles)

	const shouldDisplay = (files.length > 0) ? true : false

	return(
		<div className="filebrowse-main-container" style={{display: shouldDisplay ? 'block' : 'none'}}>
			<HeaderBar/>
			<div className="filebrowse-outer">
				{fileData}					
			</div>
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

FileBrowseElementsMain.propTypes = {
  getFiles: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
  	PropTypes.shape(filePropType)
  )
}

const mapStateToProps = state => ({
	files: state.upload.files,
	id: state.upload.id,
	selectedFiles: state.upload.selectedFiles,
})

export default connect(mapStateToProps, { getFiles, selectFile })(FileBrowseElementsMain)