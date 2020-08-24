import React from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../../Download/DownloadButton';

import { COMBINED_ASV_TABLE_ENDPOINT } from '../../../misc/EndpointConfig';

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

// Parent component: CombinedASVTable.js
function AsvDownloadSection(props) {
	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	const endpoint = ENDPOINT_ROOT + COMBINED_ASV_TABLE_ENDPOINT

	return(
		<div>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			<div className="download-container">
				<GeneralHeader
					header={"- Combined ASV Table:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={endpoint}
					isExported={true}
					exportedText={".tsv"}
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

export default connect(mapStateToProps, mapDispatchToProps)(AsvDownloadSection)