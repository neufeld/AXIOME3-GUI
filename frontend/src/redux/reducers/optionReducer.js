import { 
	UPDATE_OPTIONS,
	SELECT_OPTIONS,
	RESET_SELECTED_OPTIONS,
	RESET_OPTIONS,
} from '../actions/types';

const initialState = {
	options: {},
	selectedOptions: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_OPTIONS:
			return {
				...state,
				options: action.payload.options
			}

		case SELECT_OPTIONS:
			return {
				...state,
				selectedOptions: {
					...state.selectedOptions,
					[action.payload.name]: action.payload.value
				}
			}

		case RESET_SELECTED_OPTIONS:
			return {
				...state,
				selectedOptions: {...initialState.selectedOptions }
			}

		case RESET_OPTIONS:
			return {
				...state,
				options: { ...initialState.options }
			}

		default:
			return state
	}
}