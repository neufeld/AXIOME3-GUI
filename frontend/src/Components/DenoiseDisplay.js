import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Upload redux
import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'

import AXIOME3Template from './AXIOME3Template'

// Denoise description
import DenoiseDescription from './Description/DenoiseDescription';
// Import option interface data
import DenoiseOption from './data/DenoiseOption'
// Form type
import { DENOISE_FORMTYPE } from '../misc/FormTypeConfig';

function DenoiseDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	// Intentionally using [] as dependency;
	// Only want these to run once when it first mounts.
	useEffect(() => {
		// Get upload elements
		const uploadField = [
			{id: 0, name: "demultiplexed-seqs", file: "", label: "Demultiplexed Sequences (.qza)"}
		]
		getUploadField(uploadField)

		// Get option list
		updateOptionList(DenoiseOption)

		// Update form type
		updateFormType(DENOISE_FORMTYPE)
	}, [])

	const description = <DenoiseDescription/>

	return (
		<React.Fragment>
			<AXIOME3Template
				description={description}
				isExtension={false}
			/>
		</React.Fragment>
	)		
}

DenoiseDisplay.propTypes = {
  getUploadField: PropTypes.func.isRequired,
  updateOptionList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	options: state.option.options
})

const mapDispatchToProps = {
	getUploadField,
	updateOptionList,
	updateFormType,
}

export default connect(mapStateToProps, mapDispatchToProps)(DenoiseDisplay)