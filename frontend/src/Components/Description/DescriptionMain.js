import React from 'react'

import './Description.css'

function DescriptionMain(props) {
	const { description } = props
	return(
		<div className="description-container">
			{description}
		</div>
	)
}

export default DescriptionMain