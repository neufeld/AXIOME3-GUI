import React from 'react'
import PropTypes from 'prop-types';

import OptionLabel from './OptionLabel'
import OptionHelp from './OptionHelp'
import OptionInputField from './OptionInputField'


/**
 * Container for each detail.
 */
function OptionDetailsItem(props) {
	// label passed as props
	const { label } = props

	return(
		<div className="option-detail-item-container">
			<div className="option-label-help-outer">
				<OptionLabel label={label}/>
				<OptionHelp />
			</div>
			<OptionInputField />
		</div>
	)
}

OptionDetailsItem.propTypes = {
	label: PropTypes.string.isRequired
}

export default OptionDetailsItem