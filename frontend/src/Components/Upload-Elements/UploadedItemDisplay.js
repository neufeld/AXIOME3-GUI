import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function UploadedItemDisplay(props) {
	// Redux state
	const { selectedFiles } = props

	// Props passed from the parent component (UploadElementMain.js)
	const { id } = props

	// Retrieve uploaded file from redux states
	const uploadedFile = selectedFiles.map(selected => {
		if(selected.id === id) {
			const key = selected.id.toString() + "_uploadedFile"
			return(
				<p key={key}>Uploaded: {selected.selectedFile.name}</p>
			)
		}
	})

	return(
		<div className="flex-container accepted-file" >
			{uploadedFile}
		</div>
	)
}

UploadedItemDisplay.propTypes = {
  selectedFiles: PropTypes.arrayOf(
  	PropTypes.shape({
  		id: PropTypes.number.isRequired,
  		selectedFile: PropTypes.object.isRequired
  	})
  ).isRequired
}

const mapStateToProps = state => ({
  selectedFiles: state.upload.selectedFiles
})

export default connect(mapStateToProps)(UploadedItemDisplay)