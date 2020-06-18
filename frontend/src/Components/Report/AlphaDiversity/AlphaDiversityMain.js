import React from 'react';

import SectionHeader from '../SectionHeader'
import AlphaDiversityDownloadSection from './AlphaDiversityDownloadSection';

function AlphaDiversityMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	return(
		<section>
			<SectionHeader
				header={"Alpha Diversity Metrics"}
			/>
			<div className="report-content">
				<AlphaDiversityDownloadSection
					handleClick={handleClick}
				/>
			</div>
		</section>
	)
}

export default AlphaDiversityMain