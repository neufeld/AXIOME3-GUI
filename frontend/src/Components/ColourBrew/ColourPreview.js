import React from 'react';
import { connect } from 'react-redux';

import { selectOptions } from '../../redux/actions/optionAction'

import {
	COLOUR_BREWER,
} from '../../misc/OptionLabelConfig';

function ColourPreview(props) {
	// From parent
	const { brewer, brewTypes, selectedBrewType, selectedNumClass } = props;

	// Redux action
	const { selectOptions } = props;

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

	return(
		<React.Fragment>
			{preview}
		</React.Fragment>
	)
}

const mapStateToProps  = state => ({
})

const mapDispatchToProps = {
	selectOptions,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColourPreview)