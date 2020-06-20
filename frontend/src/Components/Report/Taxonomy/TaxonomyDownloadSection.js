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

const TaxaCollapseHeaderStyle = {
	display: 'block',
	fontStyle: 'italic',
	fontSize: '16px'
}

const DownloadMainHeader = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
}

// Parent Component: TaxonomyMain.js
function TaxonomyDownloadSection(props) {
	// UUID; redux state
	const { uid } = props;

	const taxa_list = ['domain', 'phylum', 'class', 'order', 'family', 'genus', 'species'];

	const inputField = [
		{name: 'uid', value: uid}
	];

	const taxaCollapseDownloads = taxa_list.map(taxa => {
		const header = '- ' + capitalizeFirstLetter(taxa) + ':'
		const inputField = [
			{name: 'uid', value: uid},
			{name: 'taxa', value: taxa}
		];

		const exportedDownloadPath = "/taxonomy/collapse/tsv";
		const qiimeDownloadPath = "/taxonomy/collapse/qza";

		const exportedText = ".tsv";
		const qiimeText = ".qza"

		return(
			<div className="download-container" key={taxa}>
				<GeneralHeader
					header={header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={exportedDownloadPath}
					qiimeDownloadPath={qiimeDownloadPath}
					isQza={true}
					isExported={true}
					qiimeText={qiimeText}
					exportedText={exportedText}
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
			<GeneralHeader 
				header={"ASV Level"}
				style={TaxaCollapseHeaderStyle}
			/>
			<div className="download-container">
				<GeneralHeader
					header={"- ASV:"}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					exportedDownloadPath={"/taxonomy/asv/tsv"}
					qiimeDownloadPath={"/taxonomy/asv/qza"}
					isQza={true}
					isExported={true}
					qiimeText={".qza"}
					exportedText={".tsv"}
					inputField={inputField}
				/>
			</div>
			<GeneralHeader 
				header={"Collapsed Taxonomy"}
				style={TaxaCollapseHeaderStyle}
			/>
			{taxaCollapseDownloads}
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxonomyDownloadSection)