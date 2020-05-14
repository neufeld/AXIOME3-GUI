import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './styles/AXIOME3.css'

import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import {
	INPUTUPLOAD_ROUTE,
	DENOISE_ROUTE,
	ANALYSIS_ROUTE,
	EXTENSION_ROUTE,
} from './RouteConfig';

import Header from './Components/Header'
import InputUploadComponent from './Components/InputUploadComponent'
import DenoiseComponent from './Components/DenoiseComponent'
import AnalysisComponent from './Components/AnalysisComponent'
import ExtensionComponent from './Components/ExtensionComponent'
import Footer from './Components/Footer'
import FileBrowseElementsMain from './Components/FileBrowse-Elements/FileBrowseElementsMain'

function AXIOME3() {
  return (
  	<Provider store={store}>
  		<Router>
	  		<div className="main-container">
	  			<Header />
		  		<div className="sidebar">
						<FileBrowseElementsMain/>
		  		</div>
				  <div className="main-content">
				  	<Switch>
				  		<Route exact path={INPUTUPLOAD_ROUTE} component={InputUploadComponent} />
				  		<Route path={DENOISE_ROUTE} component={DenoiseComponent} />
				  		<Route path={ANALYSIS_ROUTE} component={AnalysisComponent} />
				  		<Route path={EXTENSION_ROUTE} component={ExtensionComponent} />
						</Switch>				    
				  </div>				
			    <Footer />
			   </div>
		   </Router>
	   </Provider>
  );
}

export default withRouter(AXIOME3);
