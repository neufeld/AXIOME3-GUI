import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";

// remoteWorkerAction
import { trackWorkerStatus, updateWorkerMessages } from '../../redux/actions/remoteWorkerAction';

import SessionIdDisplay from './SessionIdDisplay'
import RemoteWorkerMessage from './RemoteWorkerMessage';
import RemoteWorkerStatusHeader from './RemoteWorkerStatusHeader';

function RemoteWorkerTracker(props) {
	// Redux actions
	const { trackWorkerStatus, updateWorkerMessages } = props;

	// Redux states
	const { uid } = props;

	const namespace = "/AXIOME3"
	const endpoint = "http://localhost:5000" + namespace;

	useEffect(() => {
		if(uid) {
			const socket = io.connect(endpoint);

			socket.emit("join", {room: uid})

			socket.on("message", (msg) => {
				console.log(msg)
			})

			socket.on("test", data => {
				const msg = data.data
				console.log(msg)
				updateWorkerMessages(msg)
				trackWorkerStatus(msg)
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
				socket.emit("leave", {room: uid})
				socket.off("FromAPI")
				socket.disconnect()
			}
		}
	}, [uid])

	return(
		<div className="worker-wrapper">
			<div className="worker-header-wrapper">
				<RemoteWorkerStatusHeader />
				<SessionIdDisplay />
			</div>
			<RemoteWorkerMessage />
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid,
})

const mapDispatchToProps = {
	trackWorkerStatus,
	updateWorkerMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerTracker)