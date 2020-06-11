import React from 'react';
import { connect } from 'react-redux';

function SessionIdDisplay(props) {
	const { isAnalysisSubmit, isRetrieveSubmit, sessionID } = props;

	return(
		<div
			className="session-id-display-container"
			style={{display: ((isAnalysisSubmit === true || isRetrieveSubmit === true) && (sessionID)) ? 'flex' : 'none'}}
		>
			<p className="worker-status-header">Session ID:</p>
			<p className="worker-status">{sessionID}</p>
		</div>
	)
}

const mapStateToProps  = state => ({
	isAnalysisSubmit: state.submit.isAnalysisSubmit,
	isRetrieveSubmit: state.submit.isRetrieveSubmit,
	sessionID: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionIdDisplay)