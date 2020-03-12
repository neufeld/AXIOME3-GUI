import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectOptions } from '../../redux/actions/optionAction'

export function OptionInputField(props) {
	// type: input tag type
	// dropdownOption: options to be used for dropdown menu
	// name: name of the option (to update redux state)
	const { type, dropdownOption = [], name, defaultValue, options } = props;

	// Redux action
	const { selectOptions } = props;

	let inputField;
	// Initially update redux state with the default value 
	useEffect(() => {
		//console.log(options)
		selectOptions(name, defaultValue)
	}, [options])

	if(type === "dropdown") {
		const options = dropdownOption.map(option => {
			return (
				<option value={option} key={option}>{option}</option>
			)
		})

		inputField = <select
										className="styled-dropdown"
										defaultValue={defaultValue}
										onChange={e => {selectOptions(name, e.target.value)}}
									>
									{options}
									</select>
	} else {
		inputField = <input
										type={type}	
										onChange={e => {selectOptions(name, e.target.value)}}
									>
									</input>
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