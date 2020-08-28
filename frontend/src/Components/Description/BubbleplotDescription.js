import React from 'react';

function BubbleplotDescription(props) {

	return(
		<div>
			<div className="description-main-text-container">
				<p>
					Bubble plot is used to represent taxonomic abundances per samples as different sizes of bubbles.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. QIIME2 archived feature table artifact (.qza) (output from "Denoise" module)</p>
				<p className="description-input-output-text">2. QIIME2 archived taxonomy artifact (.qza) (output from "Analysis" module)</p>
				<p className="description-input-output-text">3. Metadata file <span className="clickable" >(what is a metadata file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Bubble plot (.png/.pdf)</p>
			</div>
		</div>
	)
}

export default BubbleplotDescription