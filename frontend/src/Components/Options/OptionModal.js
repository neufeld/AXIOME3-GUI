import React from 'react';
import { connect } from 'react-redux';
import { handleModalOpen } from '../../redux/actions/modalAction';

import ModalMain from '../Modal/ModalMain';

import {
	SampleTypeModalBody,
	InputFormatModalBody,
	DenoiseModalBody,
	SamplingDepthModalBody,
	ColourBrewerModalBody,
	PrimaryTargetModalBody,
	SecondayTargetModalBody,
	PlotSizeModalBody,
	CoresModalBody,
} from '../Modal/ModalBodies';

import {
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	SAMPLING_DEPTH,
	FILL_VARIABLE,
	SHAPE_VARIABLE,
	COLOUR_BREWER,
	PLOT_WIDTH,
	PLOT_HEIGHT,
	CORES,
} from '../../misc/OptionLabelConfig';


export const getModalBody = (label) => {
	switch(label) {
		case SAMPLE_TYPE:
			return <SampleTypeModalBody/>
		case INPUT_FORMAT:
			return <InputFormatModalBody />
		case TRUNC_LEN_F:
			return <DenoiseModalBody/>
		case TRUNC_LEN_R:
			return <DenoiseModalBody/>
		case TRIM_LEFT_F:
			return <DenoiseModalBody/>
		case TRIM_LEFT_R:
			return <DenoiseModalBody/>
		case SAMPLING_DEPTH:
			return <SamplingDepthModalBody/>
		case FILL_VARIABLE:
			return <PrimaryTargetModalBody />
		case SHAPE_VARIABLE:
			return <SecondayTargetModalBody />
		case COLOUR_BREWER:
			return <ColourBrewerModalBody />
		case PLOT_WIDTH:
			return <PlotSizeModalBody />
		case PLOT_HEIGHT:
			return <PlotSizeModalBody />
		case CORES:
			return <CoresModalBody />
		default:
			return <SampleTypeModalBody/>
	}
}

function OptionModal(props) {
	// Redux Action
	const { handleModalOpen } = props;

	// From parent
	const { label } = props;
	const body = getModalBody(label)

	return(
		<div className="option-modal-container">
			<span className="clickable" onClick={() => {handleModalOpen(label)}}>More...</span>
			<ModalMain body={body} optionLabel={label}/>
		</div>
	)
}

const mapStateToProps  = state => ({
})

const mapDispatchToProps = {
	handleModalOpen,
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionModal)