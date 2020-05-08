import {
	UPDATE_UID,
	UPDATE_PROGRESS,
	RESET_PROGRESS,
	IS_SUBMITTING,
	SUBMIT_SUCCESS,
	SUBMIT_FAIL,
	HANDLE_CLIENT_FAILURE,
	IS_ANALYSIS_SUBMIT,
	IS_RETRIEVE_SUBMIT,
	RESET_ANALYSIS,
	RESET_RETRIEVE,
} from '../types/types';

const initialState = {
	uid: '',
	fileProgress: {},
	isSubmitting: false,
	failureMessage: '',
	isAnalysisSubmit: false,
	isRetrieveSubmit: false
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

		case RESET_ANALYSIS:
			return {
				...state,
				isAnalysisSubmit: initialState.isAnalysisSubmit,
			}

		case RESET_RETRIEVE:
			return {
				...state,
				isRetrieveSubmit: initialState.isRetrieveSubmit
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
				isSubmitting: false,
				uid: initialState.uid
			}

		case HANDLE_CLIENT_FAILURE:
			return {
				...state,
				failureMessage: action.payload.failureMessage
			}

		case IS_ANALYSIS_SUBMIT:
			return {
				...state,
				isAnalysisSubmit: true,
				isRetrieveSubmit: false,
			}

		case IS_RETRIEVE_SUBMIT:
			return {
				...state,
				isAnalysisSubmit: false,
				isRetrieveSubmit: true,
			}

		default:
			return state;
	}
}