import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList, resetOptions, resetSelectedOptions } from '../redux/actions/optionAction'

import MainTemplate from './MainTemplate'

import AnalysisOption from './data/AnalysisOption'

function AnalysisComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetSelectedOptions, resetOptions } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "feature-table", file: "", label: "Feature Table (.qza)"},
			{id: 1, name: "rep-seqs", file: "", label: "Representative sequences (.qza)"},
			{id: 2, name: "metadata", file: "", label: "Metadata (.tsv)"}
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
		updateOptionList(AnalysisOption)
	}, [])

	// Type of the form;
	// For server side processing
	const formType = "Analysis"
	const description = "This is for Analysis!"

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

const mapStateToProps = state => ({
	selectedFiles: state.upload.selectedFiles,
	selectedOptions: state.option.selectedOptions,
	options: state.option.options
})

const mapDispatchToProps = { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles, resetOptions, resetSelectedOptions }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent))