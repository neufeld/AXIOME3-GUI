import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Upload action
import { getUploadField } from '../redux/actions/uploadAction'
// Option action
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'

import AXIOME3Template from './AXIOME3Template'

import PcoaOption from './data/PcoaOption'
import { PCOA_FORMTYPE } from '../misc/FormTypeConfig';

function PcoaplotDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "pcoaQza", file: "", label: "PCoA QIIME Artifact (.qza)"},
			{id: 1, name: "metadata", file: "", label: "Metadata (.tsv)"},
		]

		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(PcoaOption)

		// Update form type
		updateFormType(PCOA_FORMTYPE)
	}, [])

	const description = "This is for PCoA!"
	const pngEndpoint = '/custompcoa/png'

	return (
		<React.Fragment>
			<AXIOME3Template
				description={description}
				isExtension={true}
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
	updateFormType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PcoaplotDisplay))