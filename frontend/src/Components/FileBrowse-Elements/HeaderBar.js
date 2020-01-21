import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertObj2Array } from './FileBrowseHelper'

function HeaderBar(props) {
	const { files } = props

	const headerText = convertObj2Array(files).map(file => {
		if(file.isRoot === true) {
			const id = file.name + "_header"
			return <p className="header" key={id}>{file.path}</p>
		}
	})

	return(
		<div className="header-container">
			{headerText}
		</div>
	)
}

HeaderBar.propTypes = {
  files: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	files: state.upload.files
})

export default connect(mapStateToProps)(HeaderBar)