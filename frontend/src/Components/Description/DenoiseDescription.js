import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import { InputFormatModalBody, InputUploadRecommendationModalBody } from '../Modal/ModalBodies';

function DenoiseDescription(props) {
	const [open, setOpen] = useState(false);
	const [modalType, setModalType ] = useState("manifest")

	const handleOpen = (type) => {
		setOpen(true)
		setModalType(type)
		//console.log(modalType)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const modalBody = modalType === "manifest" ? <InputFormatModalBody/> : <InputUploadRecommendationModalBody/>
	
	return(
		<div>
			<div className="description-main-text-container">
				<p>
					In this module, ASV feature table and representative sequences are generated.
				</p>
				<p>
					It is recommended to run "Input Upload" first, and { }
					<span className="clickable" onClick={() => {handleOpen("recommend")}}>follow this guideline { }</span>
					to choose appropriate parameters.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. Manifest file <span className="clickable" onClick={() => {handleOpen("manifest")}}>(what is a manifest file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Feature table (.qza)</p>
				<p className="description-input-output-text">2. Representative sequences (.qza)</p>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
			>
				{modalBody}
			</Modal>
		</div>
	)
}

export default DenoiseDescription