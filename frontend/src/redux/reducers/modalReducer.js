import { 
	HANDLE_MODAL_OPEN,
	HANDLE_MODAL_CLOSE,
} from '../types/types';

/*
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
	PLOT_WIDTH,
	PLOT_HEIGHT,
	X_AXIS_LABEL_SIZE,
	Y_AXIS_LABEL_SIZE,
	LEGEND_TITLE_SIZE,
	LEGEND_TEXT_SIZE,
	CORES,
} from '../../misc/OptionLabelConfig';
*/

import * as OPTION_LABELS from '../../misc/OptionLabelConfig';

const getModalInitialState = () => {
	var modalOpen = {}
	Object.keys(OPTION_LABELS).forEach(k => {
		modalOpen[OPTION_LABELS[k]] = false
	})

	var initialState = {
		modalOpen: modalOpen
	}

	return initialState
}
/*
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
		[PLOT_WIDTH]: false,
		[PLOT_HEIGHT]: false,
		[X_AXIS_LABEL_SIZE]: false,
		[Y_AXIS_LABEL_SIZE]: false,
		[LEGEND_TITLE_SIZE]: false,
		[LEGEND_TEXT_SIZE]: false,
		[CORES]: false,
	},
}
*/
const initialState = getModalInitialState()

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