import React from 'react';

import SectionHeader from '../SectionHeader';
import AsvDownloadSection from './AsvDownloadSection';

function CombinedASVTable(props) {
	return (
		<section className="report-section">
			<SectionHeader header={"Combined ASV Table"} />
			<div className="report-content">
				<AsvDownloadSection />
			</div>
		</section>
	)
}

export default CombinedASVTable