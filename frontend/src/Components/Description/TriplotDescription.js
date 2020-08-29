import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import { MetadataModalBody } from '../Modal/ModalBodies';

function TriplotDescription(props) {
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
					Triplot is used to simultaneously project samples, taxonomic contributions to the samples as weighted averages,
					and the correlation between environmental factors and the samples as vector arrows within PCoA space.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. QIIME2 archived feature table artifact (.qza) (output from "Denoise" module)</p>
				<p className="description-input-output-text">2. QIIME2 archived taxonomy artifact (.qza) (output from "Analysis" module)</p>
				<p className="description-input-output-text">3. Metadata file <span className="clickable" onClick={handleOpen}>(what is a metadata file?)</span></p>
				<p className="description-input-output-text">4. Environmental metadata <span className="clickable" onClick={handleOpen}>(what is a environmental metadata file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Triplot (.png/.pdf)</p>
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

export default TriplotDescription