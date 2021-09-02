import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './styles/AXIOME3.css'

import {
	HashRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import {
	REPORT_DYNAMIC_ROUTE,
	INPUTUPLOAD_ROUTE,
	DENOISE_ROUTE,
	TAXONOMIC_CLASSIFICATION_ROUTE,
	ANALYSIS_ROUTE,
	PCOA_ROUTE,
	BUBBLEPLOT_ROUTE,
	TRIPLOT_ROUTE,
} from './RouteConfig';

import InputUploadDisplay from './Components/InputUploadDisplay';
import DenoiseDisplay from './Components/DenoiseDisplay';
import TaxonomicClassificationDisplay from './Components/TaxonomicClassificationDisplay';
import AnalysisDisplay from './Components/AnalysisDisplay';
import PcoaplotDisplay from './Components/PcoaplotDisplay';
import BubbleplotDisplay from './Components/BubbleplotDisplay';
import TriplotDisplay from './Components/TriplotDisplay';

import Report from './Report';

function AXIOME3() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path={INPUTUPLOAD_ROUTE} component={InputUploadDisplay} />
					<Route path={DENOISE_ROUTE} component={DenoiseDisplay} />
					<Route path={TAXONOMIC_CLASSIFICATION_ROUTE} component={TaxonomicClassificationDisplay} />
					<Route path={ANALYSIS_ROUTE} component={AnalysisDisplay} />
					<Route path={PCOA_ROUTE} component={PcoaplotDisplay} />
					<Route path={BUBBLEPLOT_ROUTE} component={BubbleplotDisplay} />
					<Route path={TRIPLOT_ROUTE} component={TriplotDisplay} />
					<Route path={REPORT_DYNAMIC_ROUTE} component={Report} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default AXIOME3;
