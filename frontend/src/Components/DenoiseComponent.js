import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Upload redux
import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetSelectedOptions, resetOptions } from '../redux/actions/optionAction'

import MainTemplate from './MainTemplate'

// Import option interface data
import DenoiseOption from './data/DenoiseOption'

function DenoiseComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetSelectedOptions, resetOptions } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

	// Intentionally using [] as dependency;
	// Only want these to run once when it first mounts.
	useEffect(() => {
		// Get upload elements
		const uploadField = [
			{id: 0, name: "demultiplexed-seqs", file: "", label: "Demultiplexed Sequences (.qza)"}
		]		
		// Reset selected file
		emptySelectedFiles()

		// Reset server-browsed files
		emptyFiles()

		// Reset selected options
		resetSelectedOptions()

		resetOptions()

		getUploadField(uploadField)

		// Get option list
		updateOptionList(DenoiseOption)
	}, [])

	const formType = "DenoiseOption"
	const description = "This is for Denoise!"

	return (
		<React.Fragment>
			<MainTemplate
				formType={formType}
				selectedFiles={selectedFiles}
				selectedOptions={selectedOptions}
				description={description}
			/>
		</React.Fragment>
	)		
}

DenoiseComponent.propTypes = {
  getUploadField: PropTypes.func.isRequired,
  updateOptionList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	options: state.option.options
})

const mapDispatchToProps = { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetSelectedOptions, resetOptions }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DenoiseComponent))