import React, { useState } from 'react';

function TaxonomicClassificationDescription(props) {
	return(
		<div>
			<div className="description-main-text-container">
				<p>
					In this module, taxonomic classification is performed on feature table from Denoise module.
				</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Input(s)</p>
				<p className="description-input-output-text">1. QIIME2 archived feature table (.qza) (output from "Denoise" module)</p>
				<p className="description-input-output-text">2. QIIME2 archived representative sequences (.qza) (output from "Denoise" module)</p>
			</div>
			<div className="description-input-output-container">
				<p className="description-header">Output(s)</p>
				<p className="description-input-output-text">1. Taxonomic classification (.qza, .tsv)</p>
			</div>
		</div>
	)
}

export default TaxonomicClassificationDescription