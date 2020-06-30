import React from 'react';

import SectionHeader from '../SectionHeader'
import BetaDiversityDownloadSection from './BetaDiversityDownloadSection';

function BetaDiversityMain(props) {
	return(
		<section>
			<SectionHeader
				header={"Beta Diversity Metrics"}
			/>
			<div className="report-content">
				<BetaDiversityDownloadSection/>
			</div>
		</section>
	)
}

export default BetaDiversityMain