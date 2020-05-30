import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader'
import DownloadButton from '../DownloadButton';
import GeneralHeader from '../GeneralHeader';
import AlphaDiversityDownloadSection from './AlphaDiversityDownloadSection';

function AlphaDiversityMain(props) {
	// Redux state
	const { uid } = props;

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

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(AlphaDiversityMain)