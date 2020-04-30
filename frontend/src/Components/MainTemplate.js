import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import StatusMain from './Status/StatusMain'
import SubmitButton from './SubmitButton/SubmitButton'
// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

import { getUid } from '../redux/actions/downloadAction'
import { submitData, resetFileUploadProgress } from '../redux/actions/submitAction'

function MainTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props from parent component
	const { formType, selectedFiles, selectedOptions, description } = props;

	// Redux actions
	const { submitData, resetFileUploadProgress } = props;

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
			</div>
			<StatusMain/>
			<a href='#' onClick={() => {props.history.push('/tmp')}}>Click to view report</a>
		</div>
	)
}

const mapStateToProps  = state => ({
	
})

const mapDispatchToProps = {
	submitData,
	resetFileUploadProgress
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTemplate))