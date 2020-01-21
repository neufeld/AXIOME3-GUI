import React from 'react'

import './Description.css'

function DescriptionMain(props) {
	const { description } = props
	return(
		<div className="description-container">
			<p>{description}</p>
		</div>
	)
}

export default DescriptionMain