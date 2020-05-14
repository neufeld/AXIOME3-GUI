import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'

import AXIOME3 from './AXIOME3';
import Report from './Report';

import {
	MAIN_ROUTE,
	REPORT_ROUTE,
} from './RouteConfig';

const Routes = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Switch>
					<Route exact path={MAIN_ROUTE} component={AXIOME3} />
					<Route path={REPORT_ROUTE} component={Report} />
				</Switch>
			</div>
		</Router>
	</Provider>
);

export default Routes