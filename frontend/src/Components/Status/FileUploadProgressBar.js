import React from 'react';

function FileUploadProgressBar(props) {
	const { progress } = props;

	return(
		<div className="file-progressbar-wrapper">
			<div className="file-progressbar-container">
				<div className="file-progressbar">
					<div
						className="file-progressbar-filler"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<span className="file-progressbar-label">Uploading data to the server...</span>
			</div>
			<div>
				<span>{progress}%</span>
			</div>
		</div>
	)
}

export default FileUploadProgressBar