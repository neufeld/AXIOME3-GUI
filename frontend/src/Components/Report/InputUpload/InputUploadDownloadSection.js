import React  from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../../Download/DownloadButton';

import {
	SEQUENCE_QZA_ENDPOINT,
	SEQUENCE_QZV_ENDPOINT,
	BATCH_DOWNLOAD_ENDPOINT,
} from '../../../misc/EndpointConfig';

import { ENDPOINT_ROOT } from '../../../misc/apiConfig';

const DownloadButtonStyle = {
	display: 'inline-block'
}

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

// Parent component: InputUploadMain.js
function InputUploadDownloadSection(props) {
	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	const sequenceQzaEndpoint = ENDPOINT_ROOT + SEQUENCE_QZA_ENDPOINT
	const sequenceQzvEndpoint = ENDPOINT_ROOT + SEQUENCE_QZV_ENDPOINT
	const batchDownloadEndpoint = ENDPOINT_ROOT + BATCH_DOWNLOAD_ENDPOINT

	return(
		<div>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			<div className="download-container">
				<GeneralHeader
					header={"- Sequences:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={sequenceQzaEndpoint}
					isQza={true}
					qiimeText={".qza"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header={"- Sequences Visualization:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={sequenceQzvEndpoint}
					isQza={true}
					qiimeText={".qzv"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header={"- Download All:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={batchDownloadEndpoint}
					isQza={true}
					qiimeText={".zip"}
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

export default connect(mapStateToProps, mapDispatchToProps)(InputUploadDownloadSection)