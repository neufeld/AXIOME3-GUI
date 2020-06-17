import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function NumClasses(props) {
	const { numClasses, defaultNumClass, handleChange } = props;

	const numClassOptions = numClasses.map(n => {
		return (
			<MenuItem value={n} key={n}>{n}</MenuItem>
		)
	})

	return(
		<div className="colour-brew-textfield-container">
			<div>
				<span className="colour-brew-textfield-label">Number of classes</span>
			</div>
			<TextField
				select
				name="numClassSelect"
				variant="outlined"
				defaultValue={defaultNumClass}
				onChange={handleChange}
			>
			{numClassOptions}
			</TextField>
		</div>
	)
}

export default NumClasses