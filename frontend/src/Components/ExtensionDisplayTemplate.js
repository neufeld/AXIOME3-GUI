import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import StatusMain from './Status/StatusMain'
import SubmitButton from './SubmitButton/SubmitButton'
import VerticalTabMain from './Extension/VerticalTabMain'
import ImagePreviewMain from './ImagePreview/ImagePreviewMain'

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
	const { submitData, resetSubmit } = props;

	// Upload redux actions
	const { resetUpload } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetRemoteWorker } = props;

	useEffect(() => {
		// Reset upload related redux
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
			<VerticalTabMain/>
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<form onSubmit={(e) => {resetRemoteWorker(); handleSubmit(e, formType, selectedFiles, selectedOptions, submitData)}}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<SubmitButton />
				</form>
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
	resetUpload,
	resetSelectedOptions,
	resetOptions,
	submitData,
	resetRemoteWorker,
	resetSubmit,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExtensionDisplayTemplate))