import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Upload redux
import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

import MainTemplate from './MainTemplate'

// Import option interface data
import DenoiseOption from './data/DenoiseOption'

function DenoiseDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

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
	}, [])

	const formType = "Denoise"
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

DenoiseDisplay.propTypes = {
  getUploadField: PropTypes.func.isRequired,
  updateOptionList: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(DenoiseDisplay)