import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

function ResultMain() {
	const [data, setData] = useState("initial data")

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

	return(
		<div>
			Data is: {data}
		</div>
	)
}

export default ResultMain