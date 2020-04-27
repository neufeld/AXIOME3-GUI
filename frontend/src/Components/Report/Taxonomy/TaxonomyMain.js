import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader'
import DownloadButton from '../DownloadButton';
import GeneralHeader from '../GeneralHeader';


import { capitalizeFirstLetter } from '../ReportHelper';

import './TaxonomyStyle.css';

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

function TaxonomyMain(props) {
	// Description about this section
	const mainDescription = "16S rRNA data Taxonomic Classification Result"
	const detailDescription = "Database, amplicon region, plugin type"
	// UUID; redux state
	const { uid } = props;

	// Event handler from parent component
	const { handleClick } = props;

	const inputField = [
		{name: 'uid', value: uid},
		{name: 'taxa', value: 'phylum'}
	];

	const taxa_list = ['domain', 'phylum', 'class', 'order', 'family', 'genus', 'species'];

	const collapsed_downloads = taxa_list.map(taxa => {
		const header = '- ' + capitalizeFirstLetter(taxa) + ':'
		const inputField = [
			{name: 'uid', value: uid},
			{name: 'taxa', value: taxa}
		];

		const exportedDownloadPath = "/report/taxa_collapse/tsv";
		const qiimeDownloadPath = "/report/taxa_collapse/qza";

		return(
			<div className="taxa-collapse-download-container">
				<GeneralHeader
					header={header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					handleClick={handleClick}
					exportedDownloadPath={exportedDownloadPath}
					qiimeDownloadPath={qiimeDownloadPath}
					isQza={true}
					isExported={true}
					inputField={inputField}
				/>
			</div>
		)
	})

	return (
		<section className="report-section">
			<SectionHeader
				header={"Taxonomic Classification"}
			/>
			<p className="section-description">{mainDescription}</p>
			<GeneralHeader 
				header={"Collapsed Taxonomy"}
				style={TaxaCollapseHeaderStyle}
			/>
			{collapsed_downloads}
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.download.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxonomyMain)