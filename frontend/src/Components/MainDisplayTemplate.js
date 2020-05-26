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
import { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, resetFormType } from '../redux/actions/submitAction'
// Upload redux
import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'
// RemoteWorker redux
import { resetInputSessionId } from '../redux/actions/remoteWorkerAction'

import {
	REPORT_BASE_ROUTE,
} from '../RouteConfig';

function MainDisplayTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props from parent component
	const { formType, selectedFiles, selectedOptions, description } = props;

	// Submit redux actions
	const { submitData, resetFileUploadProgress, resetAnalysis, resetRetrieve, resetFormType } = props;

	// Upload redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props;

	// Option redux action
	const { resetSelectedOptions, resetOptions } = props;

	// RemoteWorker redux action
	const { resetInputSessionId } = props;

	// Session ID
	const { uid } = props;

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
		resetFormType()
	}, [])

	const formTypeRoute = 'formType=' + formType;
	const uidRoute = 'uid=' + uid;
	const reportRoute = REPORT_BASE_ROUTE + '?' + uidRoute + '&' + formTypeRoute

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
			<Link to={reportRoute}>
				Hello
			</Link>
		</div>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid,
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
	resetFormType,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainDisplayTemplate))

//<a href='#' onClick={() => {props.history.push('/tmp')}}>Click to view report</a>
/*
<span
				className="clickable"
				onClick={() => {handleClick(formType, REPORT_ROUTE)}}
			>
				Click to view report
			</span>
			*/