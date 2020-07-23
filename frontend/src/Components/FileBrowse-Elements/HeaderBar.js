import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function HeaderBar(props) {
	// Redux state
	const { files = [] } = props

	const headerText = files.map(file => {
		if(file.isRoot === true) {
			const id = file.name + "_header"
			return <p className="filebrowse-header" key={id}>{file.path}</p>
		}
	})

	return(
		<div className="filebrowse-header-container">
			{headerText}
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

HeaderBar.propTypes = {
  files: PropTypes.arrayOf(
  	PropTypes.shape(filePropType)
  )
}

const mapStateToProps = state => ({
	files: state.upload.files
})

export default connect(mapStateToProps)(HeaderBar)