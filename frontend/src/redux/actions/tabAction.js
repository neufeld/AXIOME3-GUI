import { UPDATE_TAB } from './types';

export const updateTab = (selectedTab) => dispatch => {
	dispatch({
		type: UPDATE_TAB,
		payload: {
			currentTab: selectedTab
		}
	})
}