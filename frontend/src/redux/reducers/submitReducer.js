import {
	UPDATE_UID,
	UPDATE_PROGRESS,
	RESET_PROGRESS,
	IS_SUBMITTING,
	SUBMIT_SUCCESS,
	SUBMIT_FAIL 
} from '../actions/types';

const initialState = {
	uid: '',
	fileProgress: {},
	isSubmitting: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_UID:
			return {
				...state,
				uid: action.payload.uid
			}

		case UPDATE_PROGRESS:
			return {
				...state,
				fileProgress: {
					...state.fileProgress,
					[action.payload.id]: {
						...state.fileProgress[action.payload.id],
						progress: action.payload.progress
					}
				}
			}

		case RESET_PROGRESS:
			return {
				...state,
				fileProgress: { ...initialState.fileProgress }
			}

		case IS_SUBMITTING:
			return {
				...state,
				isSubmitting: true
			}

		case SUBMIT_SUCCESS:
			return {
				...state,
				isSubmitting: false
			}

		case SUBMIT_FAIL:
			return {
				...state,
				isSubmitting: false
			}

		default:
			return state;
	}
}