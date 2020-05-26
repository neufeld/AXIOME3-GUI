import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import AXIOME3Template from './AXIOME3Template'

// Import option interface data
import InputUploadOption from './data/InputUploadOption'

// Upload redux
import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

/**
 * Main componenet that concerns with Input Upload module.
 */
function InputUploadDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "manifest-file", label: "Manifest File (.txt, .tsv, .csv)"}
		]		
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(InputUploadOption)
	}, [])

	// Type of the form;
	// For server side processing
	const formType = "InputUpload"
	const description = "This is for Input Upload!"

	return (
		<React.Fragment>
			<AXIOME3Template
				formType={formType}
				selectedFiles={selectedFiles}
				selectedOptions={selectedOptions}
				description={description}
				isExtension={false}
			/>
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	options: state.option.options
})

const mapDispatchToProps = { 
	getUploadField,
	updateOptionList
}

export default connect(mapStateToProps, mapDispatchToProps)(InputUploadDisplay)
