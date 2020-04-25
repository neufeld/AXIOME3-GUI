import React from 'react';

function PcoaDropDown(props) {
	// From parent
	const { name, value, options } = props;

	// onChange event handler
	const { handleChange } = props;

	return(
		<div className="pcoa-dropdown-content-container">
			<select
				className="pcoa-dropdown"
				name={name}
				onChange={handleChange}
				value={value}
			>
				{options}
			</select>
		</div>
	)
}

export default PcoaDropDown