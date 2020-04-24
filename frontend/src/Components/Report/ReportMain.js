import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import DownloadFile from './DownloadFile';
import TaxonomicClassification from './Taxonomy/TaxonomicClassification';
import CombinedASVTable from './ASVTable/CombinedASVTable';
import PcoaPlots from './PCoA/PcoaPlots';

import { updateDownloadPath, updateInputField } from '../../redux/actions/downloadAction';

function ReportMain(props) {
	const endpoint = '/report/'

	// Redux action
	const { updateDownloadPath, updateInputField } = props;

	// State change should only occur throug handleClick event
	const handleClick = (downloadPath, inputField) => {
		updateDownloadPath(downloadPath)
		updateInputField(inputField)
	}

	return(
		<div>
			<TaxonomicClassification handleClick={handleClick}/>
			<CombinedASVTable handleClick={handleClick}/>
			<PcoaPlots handleClick={handleClick}/>
			<DownloadFile
				key={props.downloadPath}
			/>
		</div>
	)
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath
})

const mapDispatchToProps = {
	updateDownloadPath,
	updateInputField
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMain)