import { UPDATE_OPTIONS } from './types';

export const updateOptionList = (options) => dispatch => {
	dispatch({
		type: UPDATE_OPTIONS,
		payload: {
			options: options
		}
	})
}