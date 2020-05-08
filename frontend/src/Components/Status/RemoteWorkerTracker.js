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
	const { isWorkerRunning, uid } = props;

	// State to store socket.io messages
	const [data, setData] = useState("");
	const namespace = "/AXIOME3"
	const endpoint = "http://localhost:5000" + namespace;

	useEffect(() => {
		if(uid !== '') {
			const socket = io.connect(endpoint);

			socket.emit("join", {room: uid})

			socket.on("message", (message) => {
				console.log(message)
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

			socket.on("error", err => {
				console.log("SocketIO error")
				console.log(err)
			})

			// Clean up
			return () => {
				socket.emit("disconnect", {data: "client disconnecting..."})
				socket.off("FromAPI")
			}
		}
	}, [uid])

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
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	uid: state.submit.uid
})

const mapDispatchToProps = {
	trackWorkerStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerTracker)