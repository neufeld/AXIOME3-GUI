import React from 'react';

function TriplotDescription(props) {

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
				<p className="description-input-output-text">3. Metadata file <span className="clickable" >(what is a metadata file?)</span></p>
				<p className="description-input-output-text">4. Environmental metadata (must have numerical data only)</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Triplot (.png/.pdf)</p>
			</div>
		</div>
	)
}

export default TriplotDescription