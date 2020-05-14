import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

import MainTemplate from './MainTemplate'

import ExtensionOption from './data/ExtensionOption'

function ExtensionComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList } = props

	// Redux states
	const { selectedFiles, selectedOptions } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "pcoaQza", file: "", label: "PCoA QIIME Artifact (.qza)"},
			{id: 1, name: "metadata", file: "", label: "Metadata (.tsv)"},
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(ExtensionOption)
	}, [])

	// Type of the form;
	// For server side processing
	const formType = "pcoa"
	const description = "This is for Extension!"

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

const mapDispatchToProps = {
	getUploadField,
	updateOptionList
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExtensionComponent))