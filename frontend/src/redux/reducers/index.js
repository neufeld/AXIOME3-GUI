import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';
import tabReducer from './tabReducer';
import optionReducer from './optionReducer';
import downloadReducer from './downloadReducer';

export default combineReducers({
	upload: uploadReducer,
	tab: tabReducer,
	option: optionReducer,
	download: downloadReducer
})