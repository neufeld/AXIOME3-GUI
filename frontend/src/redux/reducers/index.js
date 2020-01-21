import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';
import tabReducer from './tabReducer';
import optionReducer from './optionReducer';

export default combineReducers({
	upload: uploadReducer,
	tab: tabReducer,
	option: optionReducer,
})