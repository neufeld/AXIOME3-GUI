import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './styles/AXIOME3.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Header from './Components/Header'
import InputUploadComponent from './Components/InputUploadComponent'
import DenoiseComponent from './Components/DenoiseComponent'
import AnalysisComponent from './Components/AnalysisComponent'
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
				  		<Route exact path={["/", "/inputupload"]} component={InputUploadComponent} />
				  		<Route exact path="/denoise" component={DenoiseComponent} />
				  		<Route exact path="/analysis" component={AnalysisComponent} />
						</Switch>				    
				  </div>				
			    <Footer />
			   </div>
		   </Router>
	   </Provider>
  );
}

export default withRouter(AXIOME3);
