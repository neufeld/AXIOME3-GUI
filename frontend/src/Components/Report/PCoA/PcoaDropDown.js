import React from 'react';
import TextField from '@material-ui/core/TextField';

function PcoaDropDown(props) {
	// From parent
	const { name, value, options } = props;

	// onChange event handler
	const { handleChange } = props;

	return(
		<div className="pcoa-dropdown-content-container">
			<TextField
				name={name}
				onChange={handleChange}
				value={value}
				select
				variant="outlined"
			>
				{options}
			</TextField>
		</div>
	)
}

export default PcoaDropDown