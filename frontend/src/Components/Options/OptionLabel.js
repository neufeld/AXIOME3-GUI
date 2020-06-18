import React from 'react'
import PropTypes from 'prop-types';

/**
 * Label for each detail
 */
function OptionLabel(props) {
	// label passed as props
	const { label } = props || ""

	return(
		<span
			className="option-label"
		>
			{label}
		</span>
	)
}

OptionLabel.propTypes = {
	label: PropTypes.string
}

export default OptionLabel