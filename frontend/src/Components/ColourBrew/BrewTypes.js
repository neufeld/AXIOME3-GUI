import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function BrewTypes(props) {
	const { brewTypes, defaultBrewType, handleChange } = props;

	const brewTypeOptions = Object.keys(brewTypes).map(type => {
		return (
			<MenuItem value={type} key={type}>{type}</MenuItem>
		)
	})

	return(
		<div className="colour-brew-textfield-container">
			<div>
				<span className="colour-brew-textfield-label">Colour set types</span>
			</div>
			<TextField
				select
				name="brewTypeSelect"
				variant="outlined"
				defaultValue={defaultBrewType}
				onChange={handleChange}
			>
				{brewTypeOptions}
			</TextField>
		</div>
	)
}

export default BrewTypes