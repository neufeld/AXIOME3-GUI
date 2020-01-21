import React, { useState, useEffect } from 'react'

import './Options.css'
import OptionItems from './OptionItems'

function OptionsMain(props) {
	const defaultOptionList = [
		{
			id: 0,
			summaryText: "Basic Options",
			defaultExpanded: true
		},
		{
			id: 1,
			summaryText: "Advanced Options",
			detailText: "Advanded Option stuff goes here..."
		}
	]
	const [ optionList, setOptionList ] = useState(defaultOptionList)

	return(
		<div className="option-container">
			<OptionItems />
		</div>
	)
}

export default OptionsMain