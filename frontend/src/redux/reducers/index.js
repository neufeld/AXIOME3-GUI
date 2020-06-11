import { combineReducers } from 'redux';
import uploadReducer from './uploadReducer';
import tabReducer from './tabReducer';
import optionReducer from './optionReducer';
import downloadReducer from './downloadReducer';
import submitReducer from './submitReducer';
import remoteWorkerReducer from './remoteWorkerReducer';
import modalReducer from './modalReducer';

export default combineReducers({
	upload: uploadReducer,
	tab: tabReducer,
	option: optionReducer,
	download: downloadReducer,
	submit: submitReducer,
	remoteWorker: remoteWorkerReducer,
	modal: modalReducer,
})