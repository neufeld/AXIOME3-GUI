import React from 'react';

import SectionHeader from '../SectionHeader'
import AlphaDiversityDownloadSection from './AlphaDiversityDownloadSection';

function AlphaDiversityMain(props) {
	return(
		<section>
			<SectionHeader
				header={"Alpha Diversity Metrics"}
			/>
			<div className="report-content">
				<AlphaDiversityDownloadSection/>
			</div>
		</section>
	)
}

export default AlphaDiversityMain