import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { resetDownloadPath } from '../../redux/actions/downloadAction';

class DownloadFile extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//ReactDOM.findDOMNode(this).submit();
		if(this.props.downloadPath !== null) {
			console.log("DownloadFile Component mounted!")
			ReactDOM.findDOMNode(this).submit();
		}
		
		this.props.resetDownloadPath()
	}
	
	render() {
		return(
				<form
					action={this.props.downloadPath}
					method='POST'
				>
				<input name="uid" type="text" value={this.props.uid} onChange={(e) => {console.log()}}/>
				</form>
		)
	}
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath,
	uid: state.download.uid
})

const mapDispatchToProps = {
	resetDownloadPath
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadFile)