import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import CustomPcoaRedirect from './CustomPcoaRedirect';
import PcoaDownloadSection from './PcoaDownloadSection';
import SectionHeader from '../SectionHeader';
import PcoaPreview from './PcoaPreview';

import './PCoAStyles.css'

function PcoaPlots(props) {
	// States
	const [ columns, setColumns ] = useState({});
	const [ distanceTypes, setDistanceTypes ] = useState({});
	const [ columnOptionValue, setColumnOptionValue ] = useState('');
	const [ distanceOptionValue, setDistanceOptionValue ] = useState('Unweighted UniFrac');

	// Get metadata column names from the server on mount
	useEffect(() => {
		const pcoaEndpoint = '/pcoa/columns';

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
			'Unweighted UniFrac': 'unweighted_unifrac',
			'Weighted UniFrac': 'weighted_unifrac',
			'Bray-Curtis Dissimilarity': 'bray_curtis',
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

	const inputField = [
		{name: 'uid', value: uid},
		{name: 'distance', value: distanceTypes[distanceOptionValue]}
	];

	return (
		<section className="report-section">
			<SectionHeader header={"Principal Coordinate Analysis (PCoA) Plots"} />
			<div className="report-content">
				<PcoaPreview
					columns={columns}
					distanceTypes={distanceTypes}
					columnOptionValue={columnOptionValue}
					distanceOptionValue={distanceOptionValue}
					handleChange={handleChange}
				/>
				<PcoaDownloadSection
					handleClick={handleClick}
					inputField={inputField}
				/>
				<CustomPcoaRedirect />
			</div>
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(PcoaPlots)