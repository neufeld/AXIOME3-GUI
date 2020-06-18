import { 
	HANDLE_MODAL_OPEN,
	HANDLE_MODAL_CLOSE,
} from '../types/types';

import {
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	SAMPLING_DEPTH,
	PRIMARY_TARGET,
	SECONDARY_TARGET,
	COLOUR_BREWER,
	BREWER_TYPE,
	ALPHA,
	STROKE,
	POINT_SIZE,
	PC_AXIS_ONE,
	PC_AXIS_TWO,
	CORES,
} from '../../misc/OptionLabelConfig';

const initialState = {
	modalOpen: {
		[SAMPLE_TYPE]: false,
		[INPUT_FORMAT]: false,
		[TRUNC_LEN_F]: false,
		[TRUNC_LEN_R]: false,
		[TRIM_LEFT_F]: false,
		[TRIM_LEFT_R]: false,
		[SAMPLING_DEPTH]: false,
		[PRIMARY_TARGET]: false,
		[SECONDARY_TARGET]: false,
		[COLOUR_BREWER]: false,
		[BREWER_TYPE]: false,
		[ALPHA]: false,
		[STROKE]: false,
		[POINT_SIZE]: false,
		[PC_AXIS_ONE]: false,
		[PC_AXIS_TWO]: false,
		[CORES]: false,
	},
}

export default function(state = initialState, action) {
	switch(action.type) {
		case HANDLE_MODAL_OPEN:
			return {
				...state,
				modalOpen: {
					...initialState.modalOpen,
					[action.payload.label]: true
				}
			}

		case HANDLE_MODAL_CLOSE:
			return {
				...initialState,
			}

		default:
			return state
	}
}