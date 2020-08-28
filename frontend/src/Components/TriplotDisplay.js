import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUploadField } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'
// Submit redux
import { updateFormType } from '../redux/actions/submitAction'

import AXIOME3Template from './AXIOME3Template'

import TriplotOption from './data/TriplotOption'
import { TRIPLOT_FORMTYPE } from '../misc/FormTypeConfig';
// Upload field names
import { QIIME2_FEATURE_TABLE, QIIME2_TAXONOMY, METADATA_FILE, ENVIRONMENTAL_METADATA_FILE } from '../misc/InputUploadNameConfig';

import TriplotDescription from './Description/TriplotDescription'

function TriplotDisplay(props) {
	// Redux actions
	const { getUploadField, updateOptionList, updateFormType } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: QIIME2_FEATURE_TABLE, file: "", label: "Feature table QIIME2 artifact (.qza)", acceptedExtensions: ".qza"},
			{id: 1, name: QIIME2_TAXONOMY, file: "", label: "Taxonomy QIIME2 artifact (.qza)", acceptedExtensions: ".qza"},
			{id: 2, name: METADATA_FILE, file: "", label: "Sample metadata (.tsv, .txt)", acceptedExtensions: ".txt,.tsv"},
			{id: 3, name: ENVIRONMENTAL_METADATA_FILE, file: "", label: "Environmental metadata (.tsv, .txt)", acceptedExtensions: ".txt,.tsv"},
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(TriplotOption)

		// Update form type
		updateFormType(TRIPLOT_FORMTYPE)
	}, [])

	// Type of the form;
	// For server side processing
	const description = <TriplotDescription/>

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

export default connect(mapStateToProps, mapDispatchToProps)(TriplotDisplay)