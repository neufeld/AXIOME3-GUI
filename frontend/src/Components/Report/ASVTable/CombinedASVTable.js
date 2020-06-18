import React from 'react';

import SectionHeader from '../SectionHeader';
import AsvDownloadSection from './AsvDownloadSection';

function CombinedASVTable(props) {
	// Event handler from parent component
	const { handleClick } = props;

	return (
		<section className="report-section">
			<SectionHeader header={"Combined ASV Table"} />
			<div className="report-content">
				<AsvDownloadSection handleClick={handleClick} />
			</div>
		</section>
	)
}

export default CombinedASVTable