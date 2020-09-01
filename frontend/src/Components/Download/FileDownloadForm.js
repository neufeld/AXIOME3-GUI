import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { connect } from 'react-redux';

import { resetDownloadPath } from '../../redux/actions/downloadAction';

export const getInputTag = (inputField) => {
	if(inputField.length === 0) {
		return
	}

	const inputTags = inputField.map(field => {
		return(
			<input
				className="hidden"
				key={field.name}
				name={field.name}
				value={field.value}
				onChange={console.log}
			/>
		)
	})

	return inputTags
};

export const requestDownload = async (axiosConfig) => {
	try {
		const response = await axios(axiosConfig)
		const filename = response.headers['content-disposition'].split('=')[1]
		let blob = new Blob([response.data], { type: 'application/octet-stream' })
		let link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)
		link.download = filename
		link.click()
	} catch (err) {
		const message = await err.response.data.text()
		console.log(message)
		if(err.response) {
			alert(message)
		}	else {
			alert("Server unexpectedly failed...")
		}
	}
}

export class FileDownloadForm extends React.Component {
	// Whenver this componenet mounts, it will trigger file download via POST request to the backend server
	// It will remount whenever the state changes (e.g. file download path)
	// Note it remounts instead of simply re-rendering because I specified 'key' in the parent component (AXIOME3Template.js)
	componentDidMount() {
		//ReactDOM.findDOMNode(this).submit();
		if(this.props.downloadPath !== '') {
			console.log("FileDownloadForm Component mounted!")
			//ReactDOM.findDOMNode(this).submit();
			const formData = new FormData()
			this.props.inputField.forEach(field => {
				formData.append(field.name, field.value)
			})

			const config = {
				url: this.props.downloadPath,
				method: 'post',
				data: formData,
				responseType: 'blob'
			};

			// Receive UUID for each request server generated
			requestDownload(config)
		}
		
		this.props.resetDownloadPath()
	}

	
	render() {
		// InputField
		const { inputField } = this.props;
		return(
			<form>
				{getInputTag(inputField)}
			</form>
		)
	}
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath,
	inputField: state.download.inputField,
	uid: state.submit.uid
})

const mapDispatchToProps = {
	resetDownloadPath
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDownloadForm)