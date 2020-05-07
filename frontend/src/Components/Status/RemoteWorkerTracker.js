import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import io from "socket.io-client";

import RemoteWorkerMessage from './RemoteWorkerMessage';
import RemoteWorkerStatusHeader from './RemoteWorkerStatusHeader';
import { trackWorkerStatus } from '../../redux/actions/remoteWorkerAction';

function RemoteWorkerTracker(props) {
	// Redux actions
	const { trackWorkerStatus } = props;

	// Redux states
	const { isWorkerRunning, taskStatusFromRetrieve, isRetrieveSubmit } = props;

	// State to store socket.io messages
	const [data, setData] = useState("");
	const endpoint = "http://localhost:5000/test";

	useEffect(() => {
		const socket = io.connect(endpoint);

		socket.on("error", err => {
			console.log("SocketIO error")
			console.log(err)
		})

		socket.on("test", data => {
			const message = data.data
			setData(message)
			trackWorkerStatus(message)
		})

		socket.on("connect", () => {
			console.log("SocketIO connected!")
		});

		socket.on("disconnect", () => {
			console.log("SocketIO disconnected!")
		});

		// Clean up
		return () => {
			socket.emit("disconnect", {data: "client disconnecting..."})
			socket.off("FromAPI")
		}
	}, [])

	const displayMessage = ((isRetrieveSubmit === true) && (taskStatusFromRetrieve !== ''))
		? taskStatusFromRetrieve
		: data

	return(
		<div className="worker-wrapper">
			<RemoteWorkerStatusHeader 
				isWorkerRunning={isWorkerRunning}
				message={displayMessage}
			/>
			<RemoteWorkerMessage
				message={displayMessage}
			/>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	taskStatusFromRetrieve: state.remoteWorker.taskStatusFromRetrieve,
	isRetrieveSubmit: state.submit.isRetrieveSubmit,
})

const mapDispatchToProps = {
	trackWorkerStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerTracker)