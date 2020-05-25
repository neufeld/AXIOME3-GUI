import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

function VerticalTabItem(props) {
	// From VerticalTabMain.js
	const { extensionField } = props;

	const [ selectedExtension, setSelectedExtension ] = useState({});

	const handleClick = (e) => {
		setSelectedExtension({
			...selectedExtension, 
			[e.target.value]: 
		})
	}

	const extensionItems = extensionField.map(field => {
		return(
			<button
				key={field.id}
				className="vertical-tab-item"
				value={field.value}
				onClick={(e) => {console.log(e.target.value)}}
			>
				{field.label}
			</button>
		)
	}) 

	return(
		<React.Fragment>
			{extensionItems}
		</React.Fragment>
	)
}

export default withRouter(VerticalTabItem)