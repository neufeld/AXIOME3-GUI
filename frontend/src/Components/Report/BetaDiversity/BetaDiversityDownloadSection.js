import React from 'react';
import { connect } from 'react-redux';

import DownloadButton from '../../Download/DownloadButton';
import GeneralHeader from '../GeneralHeader';

import {
	BETA_DIVERSITY_ENDPOINT,
} from '../../../misc/EndpointConfig'

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
function BetaDiversityDownloadSection(props) {
	// UUID; redux state
	const { uid } = props;

	const diversities = {
		unweighted_unifrac_distance: "Unweighted UniFrac distance",
		unweighted_pcoa: "Unweighted UniFrac PCoA ordination",
		weighted_unifrac_distance: "Weighted UniFrac distance",
		weighted_pcoa: "Weighted UniFrac PCoA ordination",
		bray_curtis_distance: "Bray-Curtis distance",
		bray_curtis_pcoa: "Bray-Curtis PCoA ordination",
		jaccard_distance: "Jaccard distance",
		jaccard_pcoa: "Jaccard PCoA ordination",	
	};

	const diversityDownloads = Object.keys(diversities).map(diversity => {
		const inputField = [
			{name: 'uid', value: uid},
			{name: 'beta_diversity', value: diversity}
		];

		const header = "- " + diversities[diversity] + ": ";
		const qiimeText = ".qza";

		return(
			<div className="download-container" key={diversity}>
				<GeneralHeader
					header={header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={BETA_DIVERSITY_ENDPOINT}
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

export default connect(mapStateToProps, mapDispatchToProps)(BetaDiversityDownloadSection)