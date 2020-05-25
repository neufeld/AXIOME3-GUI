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
import { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, updateFormType, resetFormType } from '../redux/actions/submitAction'
// Upload redux
import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'
// RemoteWorker redux
import { resetInputSessionId } from '../redux/actions/remoteWorkerAction'

import {
	REPORT_ROUTE,
} from '../RouteConfig';

const openInNewTab = (URL) => {
	const win = window.open(URL, '_blank');
	if(win != null) {
		win.focus();
	}
}

function MainTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props from parent component
	const { formType, selectedFiles, selectedOptions, description } = props;

	// Submit redux actions
	const { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, updateFormType, resetFormType } = props;

	// Upload redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetInputSessionId } = props;

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

		// Reset input session id
		resetInputSessionId()

		// Reset form type
		//resetFormType()
	}, [])

	const handleClick = (formType, URL) => {
		updateFormType(formType)
		//openInNewTab(URL)
		//props.history.push(URL)
	}

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
			<Link to={REPORT_ROUTE} onClick={() => {handleClick(formType, REPORT_ROUTE)}}>
				Hello
			</Link>
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
	resetInputSessionId,
	updateFormType,
	resetFormType,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTemplate))

//<a href='#' onClick={() => {props.history.push('/tmp')}}>Click to view report</a>
/*
<span
				className="clickable"
				onClick={() => {handleClick(formType, REPORT_ROUTE)}}
			>
				Click to view report
			</span>
			*/