import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './UploadElements.css'
import UploadedItemDisplay from './UploadedItemDisplay'
import BrowseMoreButton from './BrowseMoreButton'
import DropZone from './DropZone'

function UploadElement(props) {
	// Redux state
	const { uploadField } = props

	const uploadItems = uploadField.map(item => {
		return(
			<div className="upload-outer" key={item.id}>
				<div className="upload-inner-left">
					<DropZone
						label={item.label}
						id={item.id}
					/>
      	</div>

				<div className="upload-inner-right">
	        <UploadedItemDisplay id={item.id} />
	        <BrowseMoreButton id={item.id}/>
	      </div>
			</div>
		)
	})

	return(
		<div className="upload-container">
			<form>
				{uploadItems}
			</form>
		</div>
	)
}

UploadElement.propTypes = {
  uploadField: PropTypes.arrayOf(
  	PropTypes.shape({
  		id: PropTypes.number.isRequired,
  		name: PropTypes.string.isRequired,
  		label: PropTypes.string.isRequired
  	})
  ).isRequired
}

const mapStateToProps = state => ({
  uploadField: state.upload.uploadField
})

export default connect(mapStateToProps)(UploadElement)