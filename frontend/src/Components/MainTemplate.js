import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import ResultMain from './Result/ResultMain'
import SubmitButton from './SubmitButton/SubmitButton'
// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

import { getUid } from '../redux/actions/downloadAction'

function MainTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props from parent component
	const { formType, selectedFiles, selectedOptions, description } = props;

	// Redux actions
	const { getUid } = props;

	return (
		<div className="main-display">
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<form onSubmit={(e) => {handleSubmit(e, formType, selectedFiles, selectedOptions)}}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<SubmitButton />
				</form>
			</div>
			<ResultMain/>
			<a href='#' onClick={() => {props.history.push('/tmp')}}>Click Me</a>
		</div>
	)
}

const mapStateToProps  = state => ({
	
})

const mapDispatchToProps = {
	getUid
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainTemplate))