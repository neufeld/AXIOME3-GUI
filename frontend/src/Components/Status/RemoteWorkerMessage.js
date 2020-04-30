import React from 'react';

function RemoteWorkerMessage(props) {
	const { message } = props;
	return (
		<div className="worker-message-container">
			<p className="worker-message">{message}</p>
		</div>
	)
}

export default RemoteWorkerMessage