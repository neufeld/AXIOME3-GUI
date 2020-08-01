import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { selectOptions } from '../../redux/actions/optionAction'

//import {
//	PC_AXIS_ONE,
//	PC_AXIS_TWO,
//} from '../../misc/OptionLabelConfig';

export function OptionInputField(props) {
	// type: input tag type
	// dropdownOption: options to be used for dropdown menu
	// name: name of the option (to update redux state)
	const { type, dropdownOption = [], label, defaultValue, min, max, step } = props;

	// Redux state
	const { options, selectedOptions } = props;

	// Redux action
	const { selectOptions } = props;

	let inputField;
	// Initially update redux state with the default value 
	useEffect(() => {
		selectOptions(label, defaultValue)
	}, [options])

	/*
	useEffect(() => {
		if(label == PC_AXIS_ONE || label == PC_AXIS_TWO) {
			const regex = /^PC[1-9]+\d?$/g;
			const toTest = selectedOptions[label];

			if(toTest) {
				console.log("a")
				if(!toTest.match(regex)) {
					selectedOptions[label] = defaultValue;
					alert("It should be in the form 'PCx' where x is some number.")
				}
			}
			
		}
	}, [selectedOptions[label]])
	*/

	if(type === "dropdown") {
		const dropdownItems = dropdownOption.map(option => {
			return (
				<MenuItem value={option} key={option}>{option}</MenuItem>
			)
		})
		inputField = 	
									(<TextField
										select
										fullWidth={true}
										variant="outlined"
										defaultValue={defaultValue}
										onChange={e => {selectOptions(label, e.target.value)}}
									>
									{dropdownItems}
									</TextField>)


	} else if(type === "number") {
		// To enable min, max, step in input tag
		const inputProps = {
			min: min,
			max: max,
			step: step,
		};
		let value = selectedOptions[label] || 0;
		inputField = <TextField
										type={type}
										fullWidth={true}
										value={value}
										variant="outlined"
										onChange={e => {selectOptions(label, e.target.value)}}
										inputProps={inputProps}
									>
									</TextField>
	} else if(type === "text") {
		let value = selectedOptions[label] || '';
		inputField = <TextField
										type={type}
										fullWidth={true}
										value={value}
										variant="outlined"
										onChange={e => {selectOptions(label, e.target.value)}}
									>
									</TextField>
	}

	return(
		<div className="option-input-container">
			{inputField}
		</div>
	)
}

const mapStateToProps = state => ({
	selectedOptions: state.option.selectedOptions,
	options: state.option.options
})

const mapDispatchToProps = { selectOptions }

export default connect(mapStateToProps, mapDispatchToProps)(OptionInputField)