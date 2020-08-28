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
import { resetRemoteWorker } from '../redux/actions/remoteWorkerAction'

function MainDisplayTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// Redux state
	const { formType, selectedFiles, selectedOptions, uploadField } = props;

	// props from parent component
	const { description } = props;

	// Submit redux actions
	const { submitData, resetSubmit } = props;

	// Upload redux actions
	const { resetUpload } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetRemoteWorker } = props;

	useEffect(() => {
		// Upload related redux
		resetUpload()

		// Reset options
		resetOptions()

		// Reset selected options
		resetSelectedOptions()

		// Clean up
		return () => {
			// Reset worker messages
			resetRemoteWorker()

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
				<form onSubmit={(e) => {resetRemoteWorker(); handleSubmit(e, formType, selectedFiles, selectedOptions, uploadField, submitData)}}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<EmailMain />
					<SubmitButton />
				</form>
			</div>
			<SessionRetrieveMain />
			<StatusMain/>
		</div>
	)
}

const mapStateToProps  = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	formType: state.submit.formType,
	uploadField: state.upload.uploadField,
})

const mapDispatchToProps = {
	resetUpload,
	resetSelectedOptions,
	resetOptions,
	submitData,
	resetRemoteWorker,
	resetSubmit,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplayTemplate)