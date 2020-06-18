import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'

import AXIOME3Template from './AXIOME3Template'

import PcoaOption from './data/PcoaOption'
import { BUBBLEPLOT_FORMTYPE } from '../misc/FormTypeConfig';

function BubbleplotDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "ASV table", file: "", label: "ASV table (.tsv)"}
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(PcoaOption)

		// Update form type
		updateFormType(BUBBLEPLOT_FORMTYPE)
	}, [])

	// Type of the form;
	// For server side processing
	const description = "This is for PCoA!"

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