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
	REPORT_ROUTE,
	INPUTUPLOAD_ROUTE,
	DENOISE_ROUTE,
	ANALYSIS_ROUTE,
	PCOA_ROUTE,
	BUBBLEPLOT_ROUTE,
} from './RouteConfig';

import Header from './Components/Header'
import InputUploadDisplay from './Components/InputUploadDisplay'
import DenoiseDisplay from './Components/DenoiseDisplay'
import AnalysisDisplay from './Components/AnalysisDisplay'
import PcoaplotDisplay from './Components/PcoaplotDisplay'
import BubbleplotDisplay from './Components/BubbleplotDisplay'
import Footer from './Components/Footer'
import FileBrowseElementsMain from './Components/FileBrowse-Elements/FileBrowseElementsMain'
import Report from './Report';

function AXIOME3() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path={REPORT_ROUTE} component={Report} />
					<div className="main-container">
						<Header />
						<div className="sidebar">
							<FileBrowseElementsMain/>
						</div>
						<div className="main-content">	  	
							<Route exact path={INPUTUPLOAD_ROUTE} component={InputUploadDisplay} />
							<Route path={DENOISE_ROUTE} component={DenoiseDisplay} />
							<Route path={ANALYSIS_ROUTE} component={AnalysisDisplay} />
							<Route path={PCOA_ROUTE} component={PcoaplotDisplay} />
							<Route path={BUBBLEPLOT_ROUTE} component={BubbleplotDisplay} />
						</div>
						<Footer />
					</div>
				</Switch>
			</Router>
		</Provider>
	);
}

export default AXIOME3;
