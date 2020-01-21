import React, { useState, useEffect } from 'react'

import './TabBar.css'
import TabBarItem from './TabBarItem'

function TabBarMain(props) {
	// Currently selected tab
	const [ field, setField ] = useState([])

	useEffect(() => {
		const navBarField = [
			{id: 0, label: "Input Upload", value: "/"},
			{id: 1, label: "Denoise", value: "/denoise"},
			{id: 2, label: "Analysis", value: "/analysis"}
		]

		setField(navBarField)

	}, [])

	return (
		<div className="analysis-nav-container">
			<TabBarItem navBarField={field} />
		</div>	
	)
}

export default TabBarMain