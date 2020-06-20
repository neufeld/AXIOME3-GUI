import React from 'react';

import SectionHeader from '../SectionHeader';

import InputUploadDownloadSection from './InputUploadDownloadSection';
import InputUploadDescription from './InputUploadDescription';
import InputUploadRecommendation from './InputUploadRecommendation';

// Parent component: ReportMain.js
function InputUploadMain(props) {
	return(
		<section>
			<SectionHeader header={"Input Upload"}/>
			<div className="report-content">
				<InputUploadDescription />
				<InputUploadDownloadSection />
				<InputUploadRecommendation />
			</div>
		</section>
	)
}

export default InputUploadMain