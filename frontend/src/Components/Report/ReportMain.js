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
import BetaDiversityMain from './BetaDiversity/BetaDiversityMain'

// Submit redux
import { updateFormType, updateUid } from '../../redux/actions/submitAction'

import qs from 'query-string';
import './ReportStyle.css';

import {
	INPUT_UPLOAD_FORMTYPE,
	DENOISE_FORMTYPE,
	ANALYSIS_FORMTYPE,
	TAXONOMIC_CLASSIFICATION_FORMTYPE,
} from '../../misc/FormTypeConfig';

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
			<CombinedASVTable />
			<AlphaDiversityMain />
			<BetaDiversityMain />
			<PcoaPlots />
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

	const taxonomicClassificationContent = (
		<React.Fragment>
			<TaxonomyMain />
		</React.Fragment>
	)

	let content;
	if(formType) {
		if(formType === INPUT_UPLOAD_FORMTYPE) {
			content = inputUploadContent
		} else if(formType === DENOISE_FORMTYPE) {
			content = denoiseContent
		} else if(formType === TAXONOMIC_CLASSIFICATION_FORMTYPE) {
			content = taxonomicClassificationContent
		} else if(formType === ANALYSIS_FORMTYPE){
			content = analysisContent
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