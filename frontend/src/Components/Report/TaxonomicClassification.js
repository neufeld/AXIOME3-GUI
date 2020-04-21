import React from 'react';
import { connect } from 'react-redux';

import { updateDownloadPath } from '../../redux/actions/downloadAction';

function TaxonomicClassification(props) {
	// Redux action
	const { updateDownloadPath } = props;

	const downloadPath = '/report/'

	const handleClick = () => {
		updateDownloadPath(downloadPath)
	}
	return (
		<section className="report-section">
			<h2>Taxonomic Classification</h2>
			<a href='#' onClick={() => {handleClick()}}>Download file</a>
		</section>
	)
}

const mapStateToProps  = state => ({
	
})

const mapDispatchToProps = {
	updateDownloadPath
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxonomicClassification)