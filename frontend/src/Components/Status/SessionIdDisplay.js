import React from 'react';
import { connect } from 'react-redux';

function SessionIdDisplay(props) {
	const { isAnalysisSubmit, sessionID } = props;

	return(
		<div
			className="session-id-display-container"
			style={{display: ((isAnalysisSubmit === true) && (sessionID)) ? 'flex' : 'none'}}
		>
			<p className="worker-status-header">Session ID:</p>
			<p className="worker-status">{sessionID}</p>
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