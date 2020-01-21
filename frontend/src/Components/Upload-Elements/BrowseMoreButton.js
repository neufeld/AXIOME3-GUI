import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFiles } from '../../redux/actions/uploadAction'

import UploadedItemDisplay from './UploadedItemDisplay'

function BrowseMoreButton(props) {
	// Redux action
	const { getFiles } = props

	// Props passed from the parent component (UploadElementMain.js)
	const { id } = props

	return(
		<div className="flex-container browse-more">
	    <p
	      className="clickable"
	      onClick={() => {getFiles(id)}}
	    >
	      Click here to browse from the server
	    </p>
	  </div>
	)
}

BrowseMoreButton.propTypes = {
  getFiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getFiles })(BrowseMoreButton)