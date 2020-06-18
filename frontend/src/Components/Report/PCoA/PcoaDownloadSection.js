import React from 'react';
import { connect } from 'react-redux';

import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../DownloadButton';

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

// Parent component: PcoaPlots.js
function PcoaDownloadSection(props) {
	// From parent
	const { handleClick, inputField } = props;

	return(
		<div>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			<div className="download-container">
				<GeneralHeader
					header={"- PCoA plots:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					handleClick={handleClick}
					exportedDownloadPath={"/pcoa/pdf"}
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

export default connect(mapStateToProps, mapDispatchToProps)(PcoaDownloadSection)