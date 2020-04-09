import React from 'react'

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'
import ResultMain from './Result/ResultMain'
import SubmitButton from './SubmitButton/SubmitButton'
// Custom helper functions
import { handleSubmit } from './SubmitButton/SubmitHelper'

function MainTemplate(props) {
	const subDisplayStyles = {
		background: "#DCDCDC",
		margin: "auto",
		padding: "5%"
	}

	// props
	const { formType, selectedFiles, selectedOptions, description } = props

	return (
		<div className="main-display">
			<TabBarMain/>
			<div className="sub-display" style={subDisplayStyles}>
				<form onSubmit={(e) => {handleSubmit(e, formType, selectedFiles, selectedOptions)}}>
					<DescriptionMain description={description}/>
					<UploadElementsMain />
					<OptionsMain />
					<SubmitButton />
				</form>
			</div>
			<ResultMain/>
		</div>
	)
}

export default MainTemplate