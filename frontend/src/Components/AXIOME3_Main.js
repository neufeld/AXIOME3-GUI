import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUploadField, getFiles } from '../redux/actions/uploadAction'

import UploadElementsMain from './Upload-Elements/UploadElementsMain'
import DescriptionMain from './Description/DescriptionMain'
import OptionsMain from './Options/OptionsMain'
import TabBarMain from './TabBar/TabBarMain'

class AXIOME3_Main extends React.Component {
	constructor(props) {
		super()

		this.state = {
			
		}
	}

	componentDidMount() {
		const uploadField = [
			{id: 0, name: "manifest-file", file: "", label: "Manifest File (.txt, .tsv, .csv)"},
			{id: 1, name: "metadata-file", file: "", label: "Metadata File"},
			{id: 2, name: "classifier-file", file: "", label: "Classifier"}
		]

		this.props.getUploadField(uploadField)
	}

	render() {
		const subDisplayStyles = {
			background: "#DCDCDC",
			margin: "auto",
			padding: "5%"
		}

		return (
			<div className="main-display">
				<TabBarMain />
				<div className="sub-display" style={subDisplayStyles}>
					<DescriptionMain />
					<UploadElementsMain />
					<OptionsMain />
				</div>
			</div>
		)
	}		
}

AXIOME3_Main.propTypes = {
	files: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	files: state.upload.files,
})

export default connect(mapStateToProps, { getUploadField, getFiles })(AXIOME3_Main)