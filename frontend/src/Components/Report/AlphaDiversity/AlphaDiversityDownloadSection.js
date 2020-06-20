import React from 'react';
import { connect } from 'react-redux';

import DownloadButton from '../../Download/DownloadButton';
import GeneralHeader from '../GeneralHeader';

import { capitalizeFirstLetter } from '../ReportHelper';

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold'
};

const DownloadButtonStyle = {
	display: 'inline-block'
}

const DownloadMainHeader = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
}

// Parent Component: TaxonomyMain.js
function AlphaDiversityDownloadSection(props) {
	// UUID; redux state
	const { uid } = props;

	const diversities = {
		alpha_faith_pd: "Faith's phylogenetic diversity",
		alpha_shannon: "Shannon index",
		alpha_evenness: "Species evenness",
		alpha_observed_otus: "Observed OTUs",
	};

	const diversityDownloads = Object.keys(diversities).map(diversity => {
		const inputField = [
			{name: 'uid', value: uid},
			{name: 'alpha_diversity', value: diversity}
		];

		const header = "- " + diversities[diversity] + ": ";
		const qiimeDownloadPath = "/alpha_diversity/qza";
		const qiimeText = ".qza";

		return(
			<div className="download-container" key={diversity}>
				<GeneralHeader
					header={header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={qiimeDownloadPath}
					isQza={true}
					qiimeText={qiimeText}
					inputField={inputField}
				/>
			</div>
		)
	});

	return(
		<div>
			<GeneralHeader
				header={"File downloads"}
				style={DownloadMainHeader}
			/>
			{diversityDownloads}
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(AlphaDiversityDownloadSection)