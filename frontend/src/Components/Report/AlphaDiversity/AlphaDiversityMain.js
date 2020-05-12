import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader'
import DownloadButton from '../DownloadButton';
import GeneralHeader from '../GeneralHeader';

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold'
};

const DownloadButtonStyle = {
	display: 'inline-block'
}

const TaxaCollapseHeaderStyle = {
	display: 'block',
	fontWeight: 'bold',
	fontSize: '18px'
}

function AlphaDiversityMain(props) {
	// Redux state
	const { uid } = props;

	// Event handler from parent component
	const { handleClick } = props;

	const diversities = {
		alpha_faith_pd: "Faith's phylogenetic diversity",
		alpha_shannon: "Shannon's diversity index",
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
					handleClick={handleClick}
					qiimeDownloadPath={qiimeDownloadPath}
					isQza={true}
					qiimeText={qiimeText}
					inputField={inputField}
				/>
			</div>
		)
	});


	return(
		<section>
			<SectionHeader
				header={"Alpha Diversity Metrics"}
			/>
			{diversityDownloads}
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(AlphaDiversityMain)