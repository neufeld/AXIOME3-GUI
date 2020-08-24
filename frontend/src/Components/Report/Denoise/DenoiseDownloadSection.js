import React from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../../Download/DownloadButton';

import {
	FEATURE_TABLE_ENDPOINT,
	REP_SEQS_ENDPOINT,
	SUMMARY_QZV_ENDPOINT,
	BATCH_DOWNLOAD_ENDPOINT,
} from '../../../misc/EndpointConfig';

import { ENDPOINT_ROOT } from '../../../misc/apiConfig';

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

// Parent component: DenoiseMain.js
function DenoiseDownloadSection(props) {
	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	const featureTableEndpoint = ENDPOINT_ROOT + FEATURE_TABLE_ENDPOINT
	const reqseqsEndpoint = ENDPOINT_ROOT + REP_SEQS_ENDPOINT
	const summaryQzvEndpoint = ENDPOINT_ROOT + SUMMARY_QZV_ENDPOINT
	const batchDownloadEndpoint = ENDPOINT_ROOT + BATCH_DOWNLOAD_ENDPOINT

	return(
		<div>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			<div className="download-container">
				<GeneralHeader
					header="- Feature Table:"
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={featureTableEndpoint}
					isQza={true}
					qiimeText={".qza"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header="- Representative Sequences:"
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={reqseqsEndpoint}
					isQza={true}
					qiimeText={".qza"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header="- Denoise Summary:"
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={summaryQzvEndpoint}
					isQza={true}
					qiimeText={".qzv"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header="- Download All:"
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

export default connect(mapStateToProps, mapDispatchToProps)(DenoiseDownloadSection)