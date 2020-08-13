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
	const { downloadList=[] } = props;

	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	const downloadSection = downloadList.map((downloadObj, i) => {
		return(
			<div className="preview-download-container" key={i}>
				<GeneralHeader
					header={downloadObj.header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={downloadObj.downloadPath}
					isExported={true}
					exportedText={downloadObj.displayText}
					inputField={inputField}
				/>
			</div>
		)
	})

	return(
		<div
			className="image-preview-download-container"
		>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			{downloadSection}
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDownloadSection)