import React from 'react';

function DenoiseDescription(props) {

	return(
		<div>
			<div className="description-main-text-container">
				<p>
					In this module, phylogeny tree, taxonomic classification, and diversity metrics are generated.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. QIIME2 archived feature table (.qza) (output from "Denoise" module)</p>
				<p className="description-input-output-text">2. QIIME2 archived representative sequences (.qza) (output from "Denoise" module)</p>
				<p className="description-input-output-text">3. Metadata file <span className="clickable" >(what is a metadata file?)</span></p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Phylogeny tree (.qza)</p>
				<p className="description-input-output-text">2. Taxonomic classification (.qza, .tsv)</p>
				<p className="description-input-output-text">3. Alpha diversity metrics (.qza)</p>
				<p className="description-input-output-text">4. Beta diversity metrics (.qza)</p>
				<p className="description-input-output-text">5. PCoA plots (.pdf)</p>
			</div>
		</div>
	)
}

export default DenoiseDescription