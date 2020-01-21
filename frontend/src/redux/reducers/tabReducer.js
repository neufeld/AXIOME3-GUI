import { UPDATE_TAB } from '../actions/types';

const initialState = {
	currentTab: ''
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_TAB:
			return {
				...state,
				currentTab: action.payload.currentTab
			}

		default:
			return state;
	}
}