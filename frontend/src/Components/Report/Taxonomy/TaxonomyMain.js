import React from 'react';

import TaxonomyDownloadSection from './TaxonomyDownloadSection';
import TaxonomyDescription from './TaxonomyDescription';
import SectionHeader from '../SectionHeader';

import './TaxonomyStyle.css';

function TaxonomyMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	return (
		<section className="report-section">
			<SectionHeader
				header={"Taxonomic Classification"}
			/>
			<div className="report-content">
				<TaxonomyDescription/>
				<TaxonomyDownloadSection handleClick={handleClick}/>
			</div>
		</section>
	)
}

export default TaxonomyMain