import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFiles } from '../../redux/actions/uploadAction'

import { FILEBROWSE_ENDPOINT } from '../../misc/EndpointConfig';
import { ENDPOINT_ROOT } from '../../misc/apiConfig';

export function BrowseMoreButton(props) {
	// Redux action
	const { getFiles, sessionID } = props

	// Props passed from the parent component (UploadElementMain.js)
	const { id = -1 } = props

	const fileBrowseEndpoint = ENDPOINT_ROOT + FILEBROWSE_ENDPOINT

	console.log("Session Id: " + sessionID)
	

	let startingBrowsePath = process.env.REACT_APP_OUTPUT_DIR_PATH
	if (sessionID){
		startingBrowsePath = process.env.REACT_APP_OUTPUT_DIR_PATH + "/" + sessionID
	}
	console.log("StartingBrowsePath: " + startingBrowsePath)

	return(
		<div className="flex-container browse-more">
	    <p
	      className="clickable"
	      onClick={() => {getFiles(id, fileBrowseEndpoint, startingBrowsePath)}}
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
	sessionID: state.submit.uid //session id if loaded by user
})

export default connect(mapStateToProps, { getFiles })(BrowseMoreButton)