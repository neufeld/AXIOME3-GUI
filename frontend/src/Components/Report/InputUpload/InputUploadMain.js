import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader';

import InputUploadDownloadSection from './InputUploadDownloadSection';
import InputUploadDescription from './InputUploadDescription';
import InputUploadRecommendation from './InputUploadRecommendation';

// Parent component: ReportMain.js
function InputUploadMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

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

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(InputUploadMain)