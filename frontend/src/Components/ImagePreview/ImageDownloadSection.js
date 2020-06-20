import React from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../Report/GeneralHeader';
import DownloadButton from '../Download/DownloadButton';

const DownloadButtonStyle = {
	display: 'inline-block'
};

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold'
};

const DownloadMainHeader = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
}

// Parent component: ImagePreviewMain.js
function ImageDownloadSection(props) {
	// Props from parent component
	const { pngEndpoint, pdfEndpoint, handleClick } = props;

	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	return(
		<div>
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
	uid: state.submit.uid
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDownloadSection)