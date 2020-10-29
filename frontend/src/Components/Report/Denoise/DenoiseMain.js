import React from 'react';

import DenoiseDescription from './DenoiseDescription';
import SampleSummary from './SampleSummary';
import Dada2Summary from './Dada2Summary';
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
				<Dada2Summary />
				<DenoiseDownloadSection/>
				<DenoiseRecommendation/>
			</div>
		</section>
	)
}

export default DenoiseMain