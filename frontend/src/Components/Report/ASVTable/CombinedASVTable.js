import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader'

function CombinedASVTable(props) {
	// UUID; redux state
	const { uid } = props;

	// Event handler from parent component
	const { handleClick } = props;

	const downloadPath = '/report/';
	const inputField = [
		{name: 'uid', value: uid}
	];

	return (
		<section className="report-section">
			<SectionHeader header={"Combined ASV Table"} />
			<a href='#' onClick={() => {handleClick(downloadPath, inputField)}}>Download file</a>
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CombinedASVTable)