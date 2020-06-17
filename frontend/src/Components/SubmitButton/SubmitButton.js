import React from 'react'

import './buttonStyle.css'

function SubmitButton(props) {
	// Redux states
	const { selectedFiles, options } = props

	return (
		<div className="submit-button-container">
			<input
				type="submit"
				value={"Analyze!"}
				className="submit-analysis-button"
			/>
		</div>
	)
}

export default SubmitButton