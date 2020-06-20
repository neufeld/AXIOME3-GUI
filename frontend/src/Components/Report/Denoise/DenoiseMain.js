import React from 'react';

import DenoiseDescription from './DenoiseDescription';
import SampleSummary from './SampleSummary';
import DenoiseDownloadSection from './DenoiseDownloadSection';
import DenoiseRecommendation from './DenoiseRecommendation';
import SectionHeader from '../SectionHeader';

import './DenoiseStyle.css';

function DenoiseMain(props) {
	return(
		<section>
			<SectionHeader header={"Denoise"} />
			<div className="report-content">
				<DenoiseDescription />
				<SampleSummary />
				<DenoiseDownloadSection/>
				<DenoiseRecommendation/>
			</div>
		</section>
	)
}

export default DenoiseMain