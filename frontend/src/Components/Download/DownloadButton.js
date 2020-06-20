import React from 'react';
import { connect } from 'react-redux';

import { handleDownload } from '../../redux/actions/downloadAction';

function DownloadButton(props) {
	// download paths and input field
	const { exportedDownloadPath, qiimeDownloadPath, inputField} = props;
	// file type
	const { isQza, isExported } = props;
	// onClick handler
	const { handleClick } = props;
	// inner text
	const { qiimeText, exportedText } = props;
	// Style
	const { style } = props;

	// Redux action
	const { handleDownload } = props;

	return(
		<div style={style}>
			<span
				className="clickable"
				style={{display: (isQza === true) ? 'inline' : 'None'}}
				onClick={() => {handleDownload(qiimeDownloadPath, inputField)}}
			>
			{qiimeText}
			</span>
			<span
				style={{display: (isQza === true && isExported === true) ? 'inline' : 'None'}}
			>
			{' '}/{' '} 
			</span>
			<span
				className="clickable"
				style={{display: (isExported === true) ? 'inline' : 'None'}}
				onClick={() => {handleDownload(exportedDownloadPath, inputField)}}
			>
			{exportedText}
			</span>
			<span> (Click to download) </span>
		</div>
	)
}

const mapStateToProps  = state => ({
})

const mapDispatchToProps = {
	handleDownload,
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton)