import { UPDATE_OPTIONS, SELECT_OPTIONS, RESET_SELECTED_OPTIONS, RESET_OPTIONS } from './types';

export const updateOptionList = (options) => dispatch => {
	dispatch({
		type: UPDATE_OPTIONS,
		payload: {
			options: options
		}
	})
}

export const selectOptions = (optionName, optionValue) => dispatch => {
	dispatch({
		type: SELECT_OPTIONS,
		payload: {
			name: optionName,
			value: optionValue
		}
	})
}

export const resetOptions = () => (dispatch) => {
	dispatch({
		type: RESET_OPTIONS
	})
}

export const resetSelectedOptions = () => (dispatch, getState) => {	
	dispatch({
		type: RESET_SELECTED_OPTIONS
	})
}