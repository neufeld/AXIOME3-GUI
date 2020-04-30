import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import io from "socket.io-client";

import FileUploadProgressBar from './FileUploadProgressBar'
import RemoteWorkerTracker from './RemoteWorkerTracker'
import './StatusStyle.css';

function StatusMain(props) {
	const { fileProgress, isSubmitting } = props;

	let submittedFiles;

	if(isSubmitting === true && Object.keys(fileProgress).length > 0) {
		submittedFiles = Object.keys(fileProgress).map(fileID => {
			const progress = fileProgress[fileID].progress;

			return(
				<FileUploadProgressBar key={fileID} progress={progress} />
			)
		})
	}

	return(
		<div>
			{submittedFiles}
			<RemoteWorkerTracker />
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