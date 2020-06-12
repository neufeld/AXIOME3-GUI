import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { handleModalOpen } from '../../redux/actions/modalAction';

import ModalMain from '../Modal/ModalMain';

import {
	SampleTypeModalBody,
	InputFormatModalBody,
	DenoiseModalBody,
	SamplingDepthModalBody,
	ColourBrewerModalBody,
} from '../Modal/ModalBodies';

import {
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	SAMPLING_DEPTH,
	COLOUR_BREWER,
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
		case COLOUR_BREWER:
			return <ColourBrewerModalBody />
		default:
			return <SampleTypeModalBody/>
	}
}
/*
export const getModalBody = (label) => {
	if(label === SAMPLE_TYPE) {
		return <SampleTypeModalBody />
	} else if(label === INPUT_FORMAT) {
		return <InputFormatModalBody />
	} else {
		return <SampleTypeModalBody />
	}
}
*/
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