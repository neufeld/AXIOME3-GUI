import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { InputFormatModalBody } from '../Modal/ModalBodies';
import INPUT_FORMAT_V1 from '../../Resources/inputformat_v1.png'
import INPUT_FORMAT_V2 from '../../Resources/inputformat_v2.png'

const getModalStyle = () => {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 800,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

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