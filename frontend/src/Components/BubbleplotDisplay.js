import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'

import AXIOME3Template from './AXIOME3Template'

import BubbleplotOption from './data/BubbleplotOption'
import { BUBBLEPLOT_FORMTYPE } from '../misc/FormTypeConfig';
// Upload field names
import { QIIME2_FEATURE_TABLE, QIIME2_TAXONOMY } from '../misc/InputUploadNameConfig';

function BubbleplotDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: QIIME2_FEATURE_TABLE, file: "", label: "Feature table QIIME2 artifact (.qza)", acceptedExtensions: ".qza"},
			{id: 1, name: QIIME2_TAXONOMY, file: "", label: "Taxonomy QIIME2 artifact (.qza)", acceptedExtensions: ".qza"},
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(BubbleplotOption)

		// Update form type
		updateFormType(BUBBLEPLOT_FORMTYPE)
	}, [])

	// Type of the form;
	// For server side processing
	const description = "This is for bubble plot!"

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

export default connect(mapStateToProps, mapDispatchToProps)(BubbleplotDisplay)