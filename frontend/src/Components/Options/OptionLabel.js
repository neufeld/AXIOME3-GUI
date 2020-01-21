import React from 'react'
import PropTypes from 'prop-types';

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

OptionLabel.propTypes = {
	label: PropTypes.string.isRequired
}

export default OptionLabel