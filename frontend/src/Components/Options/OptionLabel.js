import React from 'react'

/**
 * Label for each detail
 */
function OptionLabel(props) {
	// label passed as props
	const { label } = props || ""

	return(
		<React.Fragment>
			<span style={{height: '100%'}}>{label}</span>
		</React.Fragment>
	)
}

export default OptionLabel