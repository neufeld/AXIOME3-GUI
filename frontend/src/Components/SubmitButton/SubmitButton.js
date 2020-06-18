import React from 'react'

import './buttonStyle.css'

function SubmitButton(props) {
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