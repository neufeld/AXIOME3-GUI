import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CircularFeedback from './CircularFeedback';

function RemoteWorkerMessage(props) {
	// Redux state
	const { isWorkerRunning, isWorkerDone, isWorkerFailed, workerMessages } = props;

	const messageList = workerMessages.map((msg, idx) => {
		if(msg) {
			if(idx === (workerMessages.length - 1)){
				if(isWorkerRunning) {
					return(
						<div className="worker-message-item" key={idx}>
							<p className="worker-message-current" key={msg}>{msg}</p>
							<CircularFeedback />
						</div>
					)
				} else if(isWorkerDone || isWorkerFailed) {
					return(
						<div className="worker-message-item" key={idx}>
							<p className="worker-message-current" key={msg}>{msg}</p>
						</div>
					)
				}				
			} else {
				return(
					<div className="worker-message-item" key={idx}>
						<p className="worker-message-prev" key={msg}>{msg}</p>
					</div>
				)
			}	
		}
	})

	return (
		<div
			className="worker-message-container"
			style={{display: (workerMessages.length > 0) ? 'block' : 'none'}}
		>
			{messageList}
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	isWorkerDone: state.remoteWorker.isWorkerDone,
	isWorkerFailed: state.remoteWorker.isWorkerFailed,
	workerMessages: state.remoteWorker.workerMessages,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerMessage)