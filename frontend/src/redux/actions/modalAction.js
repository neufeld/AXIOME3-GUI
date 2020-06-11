import { 
	HANDLE_MODAL_OPEN,
	HANDLE_MODAL_CLOSE,
} from '../types/types';

export const handleModalOpen = (label) => dispatch => {
	dispatch({
		type: HANDLE_MODAL_OPEN,
		payload: {
			label: label,
		}
	})
}

export const handleModalClose = () => dispatch => {
	dispatch({
		type: HANDLE_MODAL_CLOSE,
	})
}