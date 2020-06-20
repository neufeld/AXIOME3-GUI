import React from 'react';

import TaxonomyDownloadSection from './TaxonomyDownloadSection';
import TaxonomyDescription from './TaxonomyDescription';
import SectionHeader from '../SectionHeader';

import './TaxonomyStyle.css';

function TaxonomyMain(props) {
	return (
		<section className="report-section">
			<SectionHeader
				header={"Taxonomic Classification"}
			/>
			<div className="report-content">
				<TaxonomyDescription/>
				<TaxonomyDownloadSection />
			</div>
		</section>
	)
}

export default TaxonomyMain