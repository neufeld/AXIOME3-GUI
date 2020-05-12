import React from 'react';
import { connect } from 'react-redux';

import DownloadFile from './DownloadFile';

import HeaderMain from './Header/HeaderMain';
import TableOfContentsMain from './TableOfContents/TableOfContentsMain';
import TaxonomyMain from './Taxonomy/TaxonomyMain';
import CombinedASVTable from './ASVTable/CombinedASVTable';
import PcoaPlots from './PCoA/PcoaPlots';
import AlphaDiversityMain from './AlphaDiversity/AlphaDiversityMain'

import { updateDownloadPath, updateInputField } from '../../redux/actions/downloadAction';

import './ReportStyle.css';

function ReportMain(props) {
	// Redux action
	const { updateDownloadPath, updateInputField } = props;

	// State change should only occur throug handleClick event
	const handleClick = (downloadPath, inputField) => {
		updateDownloadPath(downloadPath)
		updateInputField(inputField)
	}

	return(
		<div className="report-main-container">
			<HeaderMain />
			<TableOfContentsMain />
			<TaxonomyMain handleClick={handleClick}/>
			<CombinedASVTable handleClick={handleClick}/>
			<PcoaPlots handleClick={handleClick}/>
			<AlphaDiversityMain handleClick={handleClick}/>
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