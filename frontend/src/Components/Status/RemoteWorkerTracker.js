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
	const { isWorkerRunning } = props;

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

		socket.on("connect", () => {console.log("SocketIO connected!")})

		// Clean up
		return () => {
			socket.off("FromAPI")
		}
	}, [])

	return(
		<div className="worker-wrapper">
			<RemoteWorkerStatusHeader 
				isWorkerRunning={isWorkerRunning}
				message={data}
			/>
			<RemoteWorkerMessage
				message={data}
			/>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning
})

const mapDispatchToProps = {
	trackWorkerStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerTracker)