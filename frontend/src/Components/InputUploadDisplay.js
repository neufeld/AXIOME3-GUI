import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import AXIOME3Template from './AXIOME3Template'

// Import option interface data
import InputUploadOption from './data/InputUploadOption';

// Module description
import InputUploadDescription from './Description/InputUploadDescription'

// Upload redux
import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'
// Form type
import { INPUT_UPLOAD_FORMTYPE } from '../misc/FormTypeConfig';

/**
 * Main componenet that concerns with Input Upload module.
 */
function InputUploadDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "manifest-file", label: "Manifest File (.txt, .tsv, .csv)"}
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(InputUploadOption)

		// Update form type
		updateFormType(INPUT_UPLOAD_FORMTYPE)
	}, [])

	// Type of the form;
	// For server side processing
	const description = <InputUploadDescription />

	return (
		<React.Fragment>
			<AXIOME3Template
				description={description}
				isExtension={false}
			/>
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	options: state.option.options
})

const mapDispatchToProps = { 
	getUploadField,
	updateOptionList,
	updateFormType,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputUploadDisplay)
