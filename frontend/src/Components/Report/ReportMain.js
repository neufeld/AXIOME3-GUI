import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FileDownloadForm from '../Download/FileDownloadForm';

import HeaderMain from './Header/HeaderMain';
import TableOfContentsMain from './TableOfContents/TableOfContentsMain';
// Input upload related
import InputUploadMain from './InputUpload/InputUploadMain';
// Denoise related
import DenoiseMain from './Denoise/DenoiseMain';
// Analysis related
import TaxonomyMain from './Taxonomy/TaxonomyMain';
import CombinedASVTable from './ASVTable/CombinedASVTable';
import PcoaPlots from './PCoA/PcoaPlots';
import AlphaDiversityMain from './AlphaDiversity/AlphaDiversityMain'

// Submit redux
import { updateFormType, updateUid } from '../../redux/actions/submitAction'

import qs from 'query-string';
import './ReportStyle.css';

function ReportMain(props) {
	// Redux submit action
	const { updateFormType, updateUid } = props;

	// Redux state
	const { formType } = props;

	useEffect(() => {
		const parsed = qs.parse(props.location.search);
		// Update form type from query string
		const parsedFormType = parsed.formType
		updateFormType(parsedFormType)
		// Update uid from query string
		const uid = parsed.uid
		updateUid(uid)
	}, [])

	const analysisContent = (
		<React.Fragment>
			<TaxonomyMain />
			<CombinedASVTable />
			<PcoaPlots />
			<AlphaDiversityMain />
		</React.Fragment>
	)

	const inputUploadContent = (
		<React.Fragment>
			<InputUploadMain />
		</React.Fragment>
	)

	const denoiseContent = (
		<React.Fragment>
			<DenoiseMain />
		</React.Fragment>
	)

	let content;
	if(formType) {
		if(formType.toLowerCase() === "inputupload") {
			content = inputUploadContent;
		} else if(formType.toLowerCase() === "denoise") {
			content = denoiseContent;
		} else {
			content = analysisContent;
		}
	}

	return(
		<div className="report-main-container">
			<HeaderMain />
			<TableOfContentsMain />
			{content}
			<FileDownloadForm
				key={props.downloadPath}
			/>
		</div>
	)
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath,
	formType: state.submit.formType,
})

const mapDispatchToProps = {
	updateFormType,
	updateUid,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportMain))