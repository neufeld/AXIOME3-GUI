import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { brewer } from '../../Resources/ColourBrewer';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { selectOptions } from '../../redux/actions/optionAction'

import './ColourBrewStyle.css';

import {
	COLOUR_BREWER,
	BREWER_TYPE,
} from '../../misc/OptionLabelConfig';

function ColourBrewMain(props) {
	const defaultBrewType = 'sequential';
	const defaultNumClass = 3;

	const [ colors, setColors ] = useState({});
	const [ selectedBrewType, setSelectedBrewType ] = useState(defaultBrewType);
	const [ selectedNumClass, setSelectedNumClass ] = useState(defaultNumClass);

	// Redux action
	const { selectOptions } = props;

	// Redux state
	const { selectedOptions } = props;

	useEffect(() => {
		setColors(brewer)
	}, [])

	const brewTypes = {
		sequential: 'seq',
		diverging: 'div',
		qualitative: 'qual',
	};

	const numClasses = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const brewTypeOptions = Object.keys(brewTypes).map(type => {
		return (
			<MenuItem value={type} key={type}>{type}</MenuItem>
		)
	})

	const numClassOptions = numClasses.map(n => {
		return (
			<MenuItem value={n} key={n}>{n}</MenuItem>
		)
	})

	const handleChange = (e) => {
		const { name, value } = e.target;

		if(name === "brewTypeSelect") {
			setSelectedBrewType(value)
			selectOptions(BREWER_TYPE, brewTypes[value])
		} else if(name === "numClassSelect") {
			setSelectedNumClass(value)
		}
	}

	const preview = Object.keys(brewer).map(colour => {
		if(brewer[colour].type === brewTypes[selectedBrewType]) {
			if(brewer[colour][selectedNumClass]) {
				const colourSamples = brewer[colour][selectedNumClass].map(rgb => {
					return (
							<div
								key={rgb}
								className="colour-brewer-sample"
								style={{
									backgroundColor: rgb,
								}}
							>
							</div>
					)
				})
				return(
					<div
						className="colour-brewer-sample-container clickable"
						key={colour}
						onClick={() => {selectOptions(COLOUR_BREWER, colour)}}
					>
						{colourSamples}
						<span>{colour}</span>
					</div>
				)
			}
		}
	})

	return (
		<div>
			<TextField
				select
				name="brewTypeSelect"
				variant="outlined"
				defaultValue={defaultBrewType}
				onChange={handleChange}
			>
			{brewTypeOptions}
			</TextField>
			<TextField
				select
				name="numClassSelect"
				variant="outlined"
				defaultValue={defaultNumClass}
				onChange={handleChange}
			>
			{numClassOptions}
			</TextField>
			<div className="colour-brewer-preview-container">
				{preview}
			</div>
			<div className="colour-brewer-selected-container">
				<span className="colour-brewer-selected-header">Selected colour set: </span>
				<span className="colour-brewer-selected-text">{selectedOptions[COLOUR_BREWER]}</span>
			</div>
		</div>
	)
}

const mapStateToProps  = state => ({
	selectedOptions: state.option.selectedOptions,
})

const mapDispatchToProps = {
	selectOptions,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColourBrewMain)