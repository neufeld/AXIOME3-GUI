import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectFile } from '../../redux/actions/uploadAction'

/**
* ADD DOCSTRING
*/
function CheckBox(props) {
	const { matchedFileName, file, id, selectFile } = props

	let radioButton
	if(file.type === "file") {
		radioButton = <input
										type="radio"
										name="filebrowse-radio"
										value={file.name}
										checked={file.name === matchedFileName}
										onChange={() => {selectFile(id, file)}}
									/>
	}

	return(
		<div className="checkbox">
			{radioButton}
		</div>
	)
}

CheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  selectFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	id: state.upload.id
})

export default connect(mapStateToProps, { selectFile })(CheckBox)