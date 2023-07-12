import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import VersionInfoMain from './VersionInfo/VersionInfoMain'
import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import StatusMain from './Status/StatusMain'
import SubmitButton from './SubmitButton/SubmitButton'
import SessionRetrieveMain from './SessionRetrieve/SessionRetrieveMain'
import TourMain from './Tour/TourMain'
import EmailMain from './Email/EmailMain'
// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

// Submit redux
import { submitData, resetSubmit } from '../redux/actions/submitAction'
// Upload redux
import { resetUpload } from '../redux/actions/uploadAction'
// Option redux
import { resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'
// RemoteWorker redux
import { resetRemoteWorker, resetRemoteWorkerKeepSession } from '../redux/actions/remoteWorkerAction'

// Form type
import { 
	INPUT_UPLOAD_FORMTYPE,
	DENOISE_FORMTYPE,
	TAXONOMIC_CLASSIFICATION_FORMTYPE,
	ANALYSIS_FORMTYPE,
	PCOA_FORMTYPE,
	BUBBLEPLOT_FORMTYPE,
	TRIPLOT_FORMTYPE
} from '../misc/FormTypeConfig';

function MainDisplayTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// Redux state
	const { userSessionId, inputSessionId, formType, selectedFiles, selectedOptions, uploadField } = props;

	console.log("userSessionId in MainDisplayTemplate: " + userSessionId)
	console.log("inputSessionId in MainDisplayTemplate: " + inputSessionId)
	console.log("formType: " + formType)

	// props from parent component
	const { description } = props;

	// Submit redux actions
	const { submitData, resetSubmit } = props;

	// Upload redux actions
	const { resetUpload } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetRemoteWorker, resetRemoteWorkerKeepSession } = props;

	useEffect(() => {
		// Upload related redux
		resetUpload()

		// Reset options
		resetOptions()

		// Reset selected options
		resetSelectedOptions()

		// Clean up
		return () => {
			console.log("CLEAN UP")
			// Reset worker messages
			resetRemoteWorker()
			// resetRemoteWorkerKeepSession()

			// Reset submit related
			resetSubmit()
		}
	}, [])

	return (
		<div className="main-display">
			<VersionInfoMain />
			<div className="main-tab-container">
				<TabBarMain/>
				<TourMain/>
			</div>
			<div className="sub-display" style={subDisplayStyles}>
				<SessionRetrieveMain />
				<StatusMain/>
				<form onSubmit={(e) => {
						// //if submit button is clicked for Input Upload then we want a new session
						if (formType === INPUT_UPLOAD_FORMTYPE){
							console.log("Is Input Upload)")
							//resetRemoteWorker();
							resetRemoteWorkerKeepSession(); 
						} else {
							console.log("Is not Input Upload")
							// otherwise, run the worker in whatever session that we're currently on
							resetRemoteWorkerKeepSession(); 
						}
						// resetRemoteWorkerKeepSession()
						handleSubmit(e, userSessionId, formType, selectedFiles, selectedOptions, uploadField, submitData); 
						window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
					}
				}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<EmailMain />
					<SubmitButton />
				</form>
			</div>
		</div>
	)
}

const mapStateToProps  = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	formType: state.submit.formType,
	uploadField: state.upload.uploadField,
	userSessionId: state.submit.uid, //switch to state.remoteWorker.inputSessionId???
	inputSessionId: state.remoteWorker.inputSessionId
})

const mapDispatchToProps = {
	resetUpload,
	resetSelectedOptions,
	resetOptions,
	submitData,
	resetRemoteWorker,
	resetSubmit,
	resetRemoteWorkerKeepSession
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplayTemplate)