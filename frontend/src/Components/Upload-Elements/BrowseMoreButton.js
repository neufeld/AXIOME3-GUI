import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFiles } from '../../redux/actions/uploadAction'

import { FILEBROWSE_ENDPOINT } from '../../misc/EndpointConfig';
import { ENDPOINT_ROOT } from '../../misc/apiConfig';

export function BrowseMoreButton(props) {
	// Redux action
	const { getFiles } = props

	// Props passed from the parent component (UploadElementMain.js)
	const { id = -1 } = props

	const fileBrowseEndpoint = ENDPOINT_ROOT + FILEBROWSE_ENDPOINT

	return(
		<div className="flex-container browse-more">
	    <p
	      className="clickable"
	      onClick={() => {getFiles(id, fileBrowseEndpoint)}}
	    >
	      Click here to browse from the server
	    </p>
	  </div>
	)
}

BrowseMoreButton.propTypes = {
  getFiles: PropTypes.func.isRequired,
  id: PropTypes.number
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getFiles })(BrowseMoreButton)