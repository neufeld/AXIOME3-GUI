import React from 'react';

import SectionHeader from '../SectionHeader';

import InputUploadDownloadSection from './InputUploadDownloadSection';
import InputUploadDescription from './InputUploadDescription';
import InputUploadRecommendation from './InputUploadRecommendation';

// Parent component: ReportMain.js
function InputUploadMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	return(
		<section>
			<SectionHeader header={"Input Upload"}/>
			<div className="report-content">
				<InputUploadDescription />
				<InputUploadDownloadSection handleClick={handleClick}/>
				<InputUploadRecommendation />
			</div>
		</section>
	)
}

export default InputUploadMain