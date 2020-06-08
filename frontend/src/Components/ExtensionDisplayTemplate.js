import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import StatusMain from './Status/StatusMain'
import SubmitButton from './SubmitButton/SubmitButton'
import SessionIdDisplay from './Status/SessionIdDisplay'
import VerticalTabMain from './Extension/VerticalTabMain'
import ImagePreviewMain from './ImagePreview/ImagePreviewMain'

// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

import { getUid } from '../redux/actions/downloadAction'
// Submit redux
import { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, resetUid } from '../redux/actions/submitAction'
// Upload redux
import { emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'
// RemoteWorker redux
import { resetSessionId, resetRemoteWorker } from '../redux/actions/remoteWorkerAction'

function ExtensionDisplayTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}
	// Redix state
	const { formType, selectedFiles, selectedOptions } = props;

	// props from parent component
	const { description } = props;

	// Submit redux actions
	const { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, resetUid } = props;

	// Upload redux actions
	const { emptySelectedFiles, emptyFiles } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetSessionId, resetRemoteWorker } = props;

	useEffect(() => {
		// Reset selected files
		emptySelectedFiles()

		// Reset server-browsed files
		emptyFiles()

		// Reset options
		resetOptions()

		// Reset selected options
		resetSelectedOptions()

		// Reset Analysis submit
		resetAnalysis()

		// Reset session retrieve submit
		resetRetrieve()

		// Reset worker messages
		resetRemoteWorker()

		// Reset input session id
		resetSessionId()

		// Reset UID
		resetUid()
	}, [])

	return (
		<div className="main-display">
			<VerticalTabMain/>
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<form onSubmit={(e) => {handleSubmit(e, formType, selectedFiles, selectedOptions, submitData)}}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<SubmitButton />
				</form>
				<SessionIdDisplay />
			</div>
			<StatusMain/>
			<ImagePreviewMain/>
		</div>
	)
}

const mapStateToProps  = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	formType: state.submit.formType,
})

const mapDispatchToProps = {
	emptySelectedFiles,
	emptyFiles,
	resetSelectedOptions,
	resetOptions,
	submitData,
	resetFileUploadProgress,
	resetAnalysis,
	resetRetrieve,
	resetSessionId,
	resetRemoteWorker,
	resetUid,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExtensionDisplayTemplate))