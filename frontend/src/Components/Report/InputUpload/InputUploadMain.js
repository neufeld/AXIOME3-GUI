import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader';
import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../DownloadButton';

import InputUploadDescription from './InputUploadDescription';
import InputUploadRecommendation from './InputUploadRecommendation';

const DownloadButtonStyle = {
	display: 'inline-block'
}

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold'
};

// Parent component: ReportMain.js
function InputUploadMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	return(
		<section>
			<SectionHeader header={"Input Upload"}/>
			<InputUploadDescription />
			<div className="download-container">
				<GeneralHeader
					header={"- QIIME2 Artifact:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					handleClick={handleClick}
					qiimeDownloadPath={"/taxonomy/asv/qza"}
					isQza={true}
					qiimeText={".qza"}
					inputField={inputField}
				/>
			</div>
			<div className="download-container">
				<GeneralHeader
					header={"- QIIME2 Visualization:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					handleClick={handleClick}
					qiimeDownloadPath={"/taxonomy/asv/qza"}
					isQza={true}
					qiimeText={".qzv"}
					inputField={inputField}
				/>
			</div>
			<InputUploadRecommendation />
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(InputUploadMain)