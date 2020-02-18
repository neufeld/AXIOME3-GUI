import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import SubmitButton from './SubmitButton/SubmitButton'

// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

// Import option interface data
import InputUploadOption from './data/InputUploadOption'

/**
 * Main componenet that concerns with Input Upload module.
 */
function InputUploadComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props

	// Redux states
	const { selectedFiles, options } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "manifest-file", label: "Manifest File (.txt, .tsv, .csv)"}
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(InputUploadOption)

		// Reset selected files
		emptySelectedFiles()

		// Reset server-browsed files
		emptyFiles()
	}, [])

	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// Type of the form;
	// For server side processing
	const formType = "InputUpload"

	return (
		<div className="main-display">
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<form onSubmit={(e) => {handleSubmit(e, formType, selectedFiles, options)}}>
					<DescriptionMain description={"This is for Input Upload!"}/>
					<UploadElementsMain />
					<OptionsMain />
					<SubmitButton />
				</form>
			</div>
		</div>
	)		
}

const mapStateToProps = state => ({
	selectedFiles: state.upload.selectedFiles,
	options: state.option.options
})

const mapDispatchToProps = { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputUploadComponent))
