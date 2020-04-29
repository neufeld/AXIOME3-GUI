import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import io from "socket.io-client";

import FileUploadProgressBar from './FileUploadProgressBar'

import './StatusStyle.css';

function StatusMain(props) {
	const [data, setData] = useState("initial data")

	const { fileProgress, isSubmitting } = props;

	//const URL = "http://localhost:5000/datahandle/stream/"
	const endpoint = "http://localhost:5000/test"

	useEffect(() => {
		//socket = io.connect('http:127.0.0.1:5000/test')
		const socket = io.connect(endpoint);

		socket.on("error", err => {
			console.log("SocketIO error")
			console.log(err)
		})

		socket.on("test", data => {setData(data.data)})

		socket.on("connect", () => {console.log("SocketIO connected!")})

		// Clean up
		return () => {
			//eventSource.close()
			socket.off("FromAPI")
		}

		//const eventSource = new EventSource(URL)
		//eventSource.onmessage = e => {
		//	setData(e.data)
		//}
	}, [])

	let submittedFiles;

	if(isSubmitting === true && Object.keys(fileProgress).length > 0) {
		submittedFiles = Object.keys(fileProgress).map(fileID => {
			const progress = fileProgress[fileID].progress;

			return(
				<FileUploadProgressBar progress={progress} />
			)
		})
	}

	return(
		<div>
			{submittedFiles}
			<div>
				Data is: {data}
			</div>
		</div>
	)
}

const mapStateToProps  = state => ({
	fileProgress: state.submit.fileProgress,
	isSubmitting: state.submit.isSubmitting
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMain)