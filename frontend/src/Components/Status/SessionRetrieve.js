import React, { useState } from 'react';
import { connect } from 'react-redux';

import { handleRetrieveSession } from '../SubmitButton/SubmitHelper'
import { retrieveSession } from '../../redux/actions/submitAction'
import { updateInputSessionId } from '../../redux/actions/remoteWorkerAction'

function SessionRetrieve(props) {
	// Redux states
	const { isWorkerRunning, isSubmitting, inputSessionId } = props;

	// Redux actions
	const { retrieveSession, updateInputSessionId } = props;

	const handleChange = (e) => {
		const { value } = e.target;

		updateInputSessionId(value)
	}

	return(
		<div className="session-retrieve-container">
			<form onSubmit={(e) => {handleRetrieveSession(e, inputSessionId, retrieveSession)}}>
				<input
					className="session-retrieve-input"
					name="sessionID"
					value={inputSessionId}
					onChange={(e) => {handleChange(e)}}
				/>
				<input
					className="session=retrieve-btn"
					disabled={( (isWorkerRunning === true) || (isSubmitting === true) )}
					type="submit"
					value="Retrieve Session"
				/>
			</form>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	isSubmitting: state.submit.isSubmitting,
	inputSessionId: state.remoteWorker.inputSessionId,
})

const mapDispatchToProps = {
	retrieveSession,
	updateInputSessionId
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionRetrieve)