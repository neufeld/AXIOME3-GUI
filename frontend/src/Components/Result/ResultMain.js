import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

function ResultMain() {
	const [data, setData] = useState("initial data")

	//const URL = "http://localhost:5000/datahandle/stream/"
	const URL = "/datahandle/stream/"
	const endpoint = "http://localhost:5000/test"

	let socket = io.connect(endpoint);

	useEffect(() => {
		//socket = io.connect('http:127.0.0.1:5000/test')

		socket.on("error", err => {
			console.log("SocketIO error")
			console.log(err)
		})

		//const eventSource = new EventSource(URL)
		//eventSource.onmessage = e => {
		//	setData(e.data)
		//}

		// Clean up
		return () => {
			//eventSource.close()
			socket.off("FromAPI")
		}
	}, [])

	socket.on("test", data => {setData(data.data)})

	socket.on("connect", () => {console.log("SocketIO connected!")})

	return(
		<div>
			Data is: {data}
		</div>
	)
}

export default ResultMain