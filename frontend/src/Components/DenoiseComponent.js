import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Upload redux
import { getUploadField, emptySelectedFiles, emptyFiles } from '../redux/actions/uploadAction'
// Option redux
import { updateOptionList } from '../redux/actions/optionAction'

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'

// Import option interface data
import DenoiseOption from './data/DenoiseOption'

function DenoiseComponent(props) {
	// Redux actions
	const { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles } = props

	useEffect(() => {
		// Get upload elements
		const uploadField = [
			{id: 0, name: "demultiplexed-seqs", file: "", label: "Demultiplexed Sequences (.qza)"}
		]		
		getUploadField(uploadField)

		// Get option list
		updateOptionList(DenoiseOption)

		// Reset selected file
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
			<TabBarMain />
			<div className="sub-display" style={subDisplayStyles}>
				<DescriptionMain description={"This is for Denoise!"}/>
				<UploadElementsMain />
				<OptionsMain />
			</div>
		</div>
	)		
}

DenoiseComponent.propTypes = {
  getUploadField: PropTypes.func.isRequired,
  updateOptionList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
})

export default withRouter(connect(mapStateToProps, { getUploadField, updateOptionList, emptySelectedFiles, emptyFiles })(DenoiseComponent))