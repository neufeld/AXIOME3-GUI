import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'

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
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetSelectedOptions, resetOptions } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "manifest-file", label: "Manifest File (.txt, .tsv, .csv)"}
		]		
		// Reset selected files
		emptySelectedFiles()

		// Reset server-browsed files
		emptyFiles()

		// Reset options
		resetOptions()

		// Reset selected options
		resetSelectedOptions()

		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(InputUploadOption)
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
				<form onSubmit={(e) => {handleSubmit(e, formType, selectedFiles, selectedOptions)}}>
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
	selectedOptions: state.option.selectedOptions,
	options: state.option.options
})

const mapDispatchToProps = { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetOptions, resetSelectedOptions }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputUploadComponent))
