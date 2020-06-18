import React, { useState } from 'react';
import { connect } from 'react-redux';

import { brewer } from '../../Resources/ColourBrewer';
import { selectOptions } from '../../redux/actions/optionAction'

import BrewTypes from './BrewTypes';
import NumClasses from './NumClasses';
import ColourPreview from './ColourPreview';

import './ColourBrewStyle.css';

import {
	COLOUR_BREWER,
	BREWER_TYPE,
} from '../../misc/OptionLabelConfig';

function ColourBrewMain(props) {
	const defaultBrewType = 'sequential';
	const defaultNumClass = 3;

	const [ selectedBrewType, setSelectedBrewType ] = useState(defaultBrewType);
	const [ selectedNumClass, setSelectedNumClass ] = useState(defaultNumClass);

	// Redux action
	const { selectOptions } = props;

	// Redux state
	const { selectedOptions } = props;

	const brewTypes = {
		sequential: 'seq',
		diverging: 'div',
		qualitative: 'qual',
	};

	const numClasses = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const handleChange = (e) => {
		const { name, value } = e.target;

		if(name === "brewTypeSelect") {
			setSelectedBrewType(value)
			selectOptions(BREWER_TYPE, brewTypes[value])
		} else if(name === "numClassSelect") {
			setSelectedNumClass(value)
		}
	}

	return (
		<div>
			<div className="colour-brew-textfield-wrapper">
				<BrewTypes
					brewTypes={brewTypes}
					defaultBrewType={defaultBrewType}
					handleChange={handleChange}
				/>
				<NumClasses
					numClasses={numClasses}
					defaultNumClass={defaultNumClass}
					handleChange={handleChange}
				/>
			</div>
			<div className="colour-brewer-preview-container">
				<ColourPreview
					brewer={brewer}
					brewTypes={brewTypes}
					selectedBrewType={selectedBrewType}
					selectedNumClass={selectedNumClass}
				/>
			</div>
			<div className="colour-brewer-selected-container">
				<span className="colour-brewer-selected-header">Selected colour set:</span>
				<span className="colour-brewer-selected-text">{selectedOptions[COLOUR_BREWER]}</span>
			</div>
			<div className="colour-brew-exit-container">
				<span className="colour-brew-exit-text">Press Esc to return</span>
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