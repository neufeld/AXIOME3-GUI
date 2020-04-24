import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import PcoaPreview from './PcoaPreview';

function PcoaPlots(props) {
	// States
	const [ columns, setColumns ] = useState({});
	const [ distanceTypes, setDistanceTypes ] = useState({});
	const [ columnOptionValue, setColumnOptionValue ] = useState('');
	const [ distanceOptionValue, setDistanceOptionValue ] = useState('Unweighted Unifrac');

	// Get metadata column names from the server on mount
	useEffect(() => {
		const pcoaEndpoint = '/report/pcoa/columns';

		const getMetadataColumns = async () => {
			const formData = new FormData();

			formData.append('uid', uid);
			const res = await axios.post(pcoaEndpoint, formData, {
	 			headers: {
	 				'Content-Type': 'multipart/form-data'
	 			}
	 		});

			setColumns(res.data);
			setColumnOptionValue(Object.keys(res.data)[0]);
		};
		
		getMetadataColumns();

		setDistanceTypes({
			'Unweighted Unifrac': 'unweighted_unifrac',
			'Weighted Unifrac': 'weighted_unifrac',
			'Bray-Curtis': 'bray_curtis',
			'Jaccard': 'jaccard'
		})
	},[])

	// Dropdown change handler
	const handleChange = (e) => {
		const { name, value } = e.target;
		
		if(name === 'distanceType') {
			setDistanceOptionValue(value);
		} else if(name === 'columnType') {
			setColumnOptionValue(value);
		}
	}

	// UUID; redux state
	const { uid } = props;

	// Event handler from parent component
	const { handleClick } = props;

	const downloadPath = '/report/pcoa/pdf';
	const inputField = [
		{name: 'uid', value: uid},
		{name: 'distance', value: distanceTypes[distanceOptionValue]}
	];

	return (
		<section className="report-section">
			<h2>Principal Coordinate Analysis (PCoA) Plots</h2>
			<PcoaPreview
				columns={columns}
				distanceTypes={distanceTypes}
				columnOptionValue={columnOptionValue}
				distanceOptionValue={distanceOptionValue}
				handleChange={handleChange}
			/>
			<a href='#' onClick={() => {handleClick(downloadPath, inputField)}}>Download file</a>
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.download.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(PcoaPlots)