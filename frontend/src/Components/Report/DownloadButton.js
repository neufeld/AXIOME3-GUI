import React from 'react';

function DownloadButton(props) {
	// download paths and input field
	const { exportedDownloadPath, qiimeDownloadPath, inputField} = props;
	// file type
	const { isQza, isExported } = props;
	// onClick handler
	const { handleClick } = props;
	// Style
	const { style } = props;

	return(
		<div style={style}>
			<span
				className="clickable"
				style={{display: (isQza === true) ? 'inline' : 'None'}}
				onClick={() => {handleClick(qiimeDownloadPath, inputField)}}
			>
			.qza
			</span>
			<span
				style={{display: (isQza === true && isExported === true) ? 'inline' : 'None'}}
			>
			{' '}/{' '} 
			</span>
			<span
				className="clickable"
				style={{display: (isExported === true) ? 'inline' : 'None'}}
				onClick={() => {handleClick(exportedDownloadPath, inputField)}}
			>
			.tsv
			</span>
			<span> (Click to download) </span>
		</div>
	)
}

export default DownloadButton