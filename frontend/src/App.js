import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './styles/App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Components/Header'
import InputUploadComponent from './Components/InputUploadComponent'
import DenoiseComponent from './Components/DenoiseComponent'
import AnalysisComponent from './Components/AnalysisComponent'
import Footer from './Components/Footer'
import FileBrowseElementsMain from './Components/FileBrowse-Elements/FileBrowseElementsMain'

function App() {
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

export default App;
