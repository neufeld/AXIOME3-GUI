import { UPDATE_OPTIONS } from '../actions/types';

const initialState = {
	options: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_OPTIONS:
			return {
				...state,
				options: action.payload.options
			}

		default:
			return state
	}
}