import React from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../Report/GeneralHeader';
import DownloadButton from '../Download/DownloadButton';

const DownloadButtonStyle = {
	display: 'inline-block',
	textAlign: 'left',
};

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold',
	textAlign: 'left',
};

const DownloadMainHeader = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
	textAlign: 'left',
}

// Parent component: ImagePreviewMain.js
function ImageDownloadSection(props) {
	// Props from parent component
	const { pngEndpoint, pdfEndpoint, handleClick } = props;

	// Redux states
	const { uid, isWorkerDone } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	return(
		<div
			style={{display: (isWorkerDone) ? 'block' : 'none'}}
			className="image-preview-download-container"
		>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			<div className="download-container">
				<GeneralHeader
					header={"- PCoA plot (.png):"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={pngEndpoint}
					isExported={true}
					exportedText={".png"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header={"- PCoA plot (.pdf):"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={pdfEndpoint}
					isExported={true}
					exportedText={".pdf"}
					inputField={inputField}
				/>
			</div>
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid,
	isWorkerDone: state.remoteWorker.isWorkerDone,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDownloadSection)