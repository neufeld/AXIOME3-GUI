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
// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

import { getUid } from '../redux/actions/downloadAction'
// Submit redux
import { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve } from '../redux/actions/submitAction'
// Upload redux
import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'

function MainTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props from parent component
	const { formType, selectedFiles, selectedOptions, description } = props;

	// Submit redux actions
	const { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve } = props;

	// Upload redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

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
	}, [])

	return (
		<div className="main-display">
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
			<a href='#' onClick={() => {props.history.push('/tmp')}}>Click to view report</a>
		</div>
	)
}

const mapStateToProps  = state => ({
	
})

const mapDispatchToProps = {
	getUploadField,
	updateOptionList,
	emptySelectedFiles,
	emptyFiles,
	resetSelectedOptions,
	resetOptions,
	submitData,
	resetFileUploadProgress,
	resetAnalysis,
	resetRetrieve,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTemplate))