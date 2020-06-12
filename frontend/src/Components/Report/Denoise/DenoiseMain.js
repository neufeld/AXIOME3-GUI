import React from 'react';

import DenoiseDescription from './DenoiseDescription';
import SampleSummary from './SampleSummary';
import DenoiseDownloadSection from './DenoiseDownloadSection';
import SectionHeader from '../SectionHeader';

import './DenoiseStyle.css';

function DenoiseMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	return(
		<section>
			<SectionHeader header={"Denoise"} />
			<div className="report-content">
				<DenoiseDescription />
				<SampleSummary />
				<DenoiseDownloadSection
					handleClick={handleClick}
				/>
			</div>
		</section>
	)
}

export default DenoiseMain