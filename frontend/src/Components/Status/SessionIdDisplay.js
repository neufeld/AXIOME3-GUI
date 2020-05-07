import React from 'react';
import { connect } from 'react-redux';

function SessionIdDisplay(props) {
	const { isAnalysisSubmit, sessionID } = props;

	return(
		<div
			className="session-id-display-container"
			style={{display: ((isAnalysisSubmit === true) && (sessionID !== '')) ? 'inline-block' : 'none'}}
		>
			<p>Session ID: {sessionID}</p>
			<p>Save the session ID to retrieve it later</p>
		</div>
	)
}

const mapStateToProps  = state => ({
	isAnalysisSubmit: state.submit.isAnalysisSubmit,
	sessionID: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionIdDisplay)