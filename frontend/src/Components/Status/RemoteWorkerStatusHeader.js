import React from 'react';

export const getHeaderStatus = (isWorkerRunning, message) => {
	let headerStatus;

	if(isWorkerRunning === true) {
		headerStatus = "Task running..."
	} else {
		if(message === "") {
			headerStatus = "Task not queued..."
		} else if(message === "Done!") {
			headerStatus = "Task done running!"
		} else { // it failed...
			headerStatus = "Task failed..."
		}
	}

	return headerStatus
}

function RemoteWorkerStatusHeader(props) {
	const { isWorkerRunning, message } = props;

	const headerStatus = getHeaderStatus(isWorkerRunning, message);

	return (
		<div className="worker-status-header-container">
			<p className="worker-status-header">Task Status: </p>
			<p className="worker-status">{headerStatus}</p>
		</div>
	)
}

export default RemoteWorkerStatusHeader