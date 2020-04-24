import React, { useState, useEffect } from 'react';

import PcoaDropdown from './PcoaDropdown';

function PcoaPlots(props) {
	// State to store metadata columns
	const [ columns, setColumns ] = useState({});

	const downloadPath = '/report/';

	// Props from parent component
	const { handleClick } = props;

	return (
		<section className="report-section">
			<h2>Principal Coordinate Analysis (PCoA) Plots</h2>
			<PcoaDropdown columns={columns}/>
			<a href='#' onClick={() => {handleClick(downloadPath)}}>Download file</a>
		</section>
	)
}

export default PcoaPlots