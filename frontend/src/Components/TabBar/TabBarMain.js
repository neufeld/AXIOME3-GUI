import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './TabBar.css'
import TabBarItem from './TabBarItem';

import {
	INPUTUPLOAD_ROUTE,
	DENOISE_ROUTE,
	ANALYSIS_ROUTE,
	EXTENSION_ROUTE,
} from '../../RouteConfig';

function TabBarMain(props) {
	// Currently selected tab
	const [ field, setField ] = useState([])

	useEffect(() => {
		const navBarField = [
			{id: 0, label: "Input Upload", value: INPUTUPLOAD_ROUTE},
			{id: 1, label: "Denoise", value: DENOISE_ROUTE},
			{id: 2, label: "Analysis", value: ANALYSIS_ROUTE},
			{id: 3, label: "Extension", value: EXTENSION_ROUTE}
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