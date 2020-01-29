import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

export const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

// Enable action trace for easier debug
const store = createStore(
	rootReducer, 
	initialState,
	composeEnhancers(applyMiddleware(...middleware))
);

/*
const store = createStore(
	rootReducer, 
	initialState,
	composeWithDevTools(
		applyMiddleware(...middleware)
	)
);
*/

export default store;