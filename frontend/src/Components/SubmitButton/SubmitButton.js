import React from 'react'

import './buttonStyle.css'

function SubmitButton(props) {
	// Redux states
	const { selectedFiles, options } = props

	return (
		<div>
			<input
				type="submit"
				value={"Analyze!"}
				className="submit-button"
			/>
		</div>
	)
}

export default SubmitButton