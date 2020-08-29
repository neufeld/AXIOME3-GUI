import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import { MetadataModalBody } from '../Modal/ModalBodies';

function PcoaDescription(props) {
	const [open, setOpen] = useState(false);

	const handleOpen = (type) => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const modalBody = <MetadataModalBody/>

	return(
		<div>
			<div className="description-main-text-container">
				<p>
					PCoA is used to project samples into multidimensional space while maximally preserving the original dissimilarity relationship between the samples.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. QIIME2 archived PCoA artifact (.qza) (output from "Analysis" module)</p>
				<p className="description-input-output-text">2. Metadata file <span className="clickable" onClick={handleOpen}>(what is a metadata file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. PCoA plot (.png/.pdf)</p>
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

export default PcoaDescription