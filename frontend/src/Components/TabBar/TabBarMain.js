import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

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

TabBarMain.propTypes = {
	navBarField: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		})
	)
}

export default TabBarMain