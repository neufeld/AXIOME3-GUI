import React from 'react';
import { connect } from 'react-redux';

function TaxonomicClassification(props) {
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
			<h2>Taxonomic Classification</h2>
			<a href='#' onClick={() => {handleClick(downloadPath, inputField)}}>Download file</a>
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.download.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxonomicClassification)