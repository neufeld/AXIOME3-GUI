//import { createStore, applyMiddleware } from 'redux';
//import rootReducer from '../src/redux/reducers';
import { middleware } from '../src/redux/store'
import configureStore from 'redux-mock-store';

const mockStore = configureStore(middleware)
export const makeMockStore = (initialState = {}) => {
	return mockStore({
		...initialState
	});
}