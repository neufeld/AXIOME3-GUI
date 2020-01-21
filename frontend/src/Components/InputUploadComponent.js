import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'

// Import option interface data
import InputUploadOption from './data/InputUploadOption'

/**
 * Main componenet that concerns with Input Upload module.
 */
function InputUploadComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props

	useEffect(() => {
		const uploadField = [
			{id: 0, name: "manifest-file", file: "", label: "Manifest File (.txt, .tsv, .csv)"},
			{id: 1, name: "metadata-file", file: "", label: "Metadata File"}
		]
		// Get upload elements
		getUploadField(uploadField)

		// Get option list
		updateOptionList(InputUploadOption)

		// Reset selected files
		emptySelectedFiles()

		// Reset server-browsed files
		emptyFiles()
	}, [])

	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	return (
		<div className="main-display">
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<DescriptionMain description={"This is for Input Upload!"}/>
				<UploadElementsMain />
				<OptionsMain />
			</div>
		</div>
	)		
}

const mapStateToProps = state => ({
})

export default withRouter(connect(mapStateToProps, { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles })(InputUploadComponent))