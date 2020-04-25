import React from 'react';

function PcoaDropDownLabel(props) {
	const { label } = props;

	return(
		<div className="pcoa-dropdown-label-container">
			<p className="pcoa-dropdown-label">{label}</p>
		</div>
	)
}

export default PcoaDropDownLabel