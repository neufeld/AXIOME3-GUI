import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { resetDownloadPath } from '../../redux/actions/downloadAction';

const getInputTag = (inputField) => {
	if(inputField.length === 0) {
		return
	}

	const inputTags = inputField.map(field => {
		return(
			<input
				className="hidden"
				key={field.name}
				name={field.name}
				value={field.value}
				onChange={console.log}
			/>
		)
	})

	return inputTags
};

class DownloadFile extends React.Component {
	componentDidMount() {
		//ReactDOM.findDOMNode(this).submit();
		if(this.props.downloadPath !== '') {
			console.log("DownloadFile Component mounted!")
			ReactDOM.findDOMNode(this).submit();
		}
		
		this.props.resetDownloadPath()
	}
	
	render() {
		// InputField
		const { inputField } = this.props;
		return(
				<form
					action={this.props.downloadPath}
					method='POST'
				>
				{getInputTag(inputField)}
				</form>
		)
	}
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath,
	inputField: state.download.inputField,
	uid: state.submit.uid
})

const mapDispatchToProps = {
	resetDownloadPath
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadFile)