import React from 'react'
import PropTypes from 'prop-types';

/**
 * Label for each detail
 */
function OptionLabel(props) {
	// label passed as props
	const { label } = props || ""

	return(
		<div className="option-label-container">
			<span
				style={{height: '100%'}}
				className="option-label"
			>
				{label}
			</span>
		</div>
	)
}

OptionLabel.propTypes = {
	label: PropTypes.string
}

export default OptionLabel