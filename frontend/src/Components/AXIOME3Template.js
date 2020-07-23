import React from 'react';
import { connect } from 'react-redux';

import Header from './Header'
import Footer from './Footer'
import MainDisplayTemplate from './MainDisplayTemplate'
import ExtensionDisplayTemplate from './ExtensionDisplayTemplate'
import FileBrowseElementsMain from './FileBrowse-Elements/FileBrowseElementsMain'
import VerticalTabMain from './Extension/VerticalTabMain'

import FileDownloadForm from './Download/FileDownloadForm';

// Parent Component: *DisplayComponent.js
function AXIOME3Template(props) {
	// From parent component
	const { formType, selectedFiles, selectedOptions, description, isExtension } = props;

	let mainContent;
	let extensionSideBar;
	if(isExtension === true) {
		mainContent = (
			<React.Fragment>
				<ExtensionDisplayTemplate
					formType={formType}
					selectedFiles={selectedFiles}
					selectedOptions={selectedOptions}
					description={description}
					isExtension={true}
				/>
			</React.Fragment>
		)
		extensionSideBar = (
			<VerticalTabMain/>
		)
	} else {
		mainContent = (
			<React.Fragment>
				<MainDisplayTemplate
					formType={formType}
					selectedFiles={selectedFiles}
					selectedOptions={selectedOptions}
					description={description}
				/>
			</React.Fragment>
		)
	}

	return(
		<div className="site-wrapper">
			<Header />
			<div className="axiome3-main-wrapper">
				<div className="axiome3-main-container">
					<div className="sidebar-left">
						<FileBrowseElementsMain/>
					</div>
					<div className="main-content">
						{mainContent}
					</div>
				</div>
				<div className="sidebar-right">
					{extensionSideBar}
				</div>
			</div>
			<Footer />
			<FileDownloadForm key={props.downloadPath}/>
		</div>
	)
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AXIOME3Template)