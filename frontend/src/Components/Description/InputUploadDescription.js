import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import { InputFormatModalBody } from '../Modal/ModalBodies';

function InputUploadDescription(props) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const modalBody = <InputFormatModalBody/>

	return(
		<div>
			<div className="description-main-text-container">
				<p>
					In this module, input FASTQ sequences are converted to QIIME2 compatible formats.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. Manifest file <span className="clickable" onClick={handleOpen}>(what is a manifest file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. QIIME2 compatible input files (.qza, .qzv)</p>
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

export default InputUploadDescription