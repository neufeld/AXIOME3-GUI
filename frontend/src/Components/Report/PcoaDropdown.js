import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function PcoaDropdown(props) {
	
	const [ columns, setColumns ] = useState({});
	const [ distanceTypes, setDistanceTypes ] = useState({});
	const [ columnOptionValue, setColumnOptionValue ] = useState('');
	const [ distanceOptionValue, setDistanceOptionValue ] = useState('Unweighted Unifrac');
	const [ tmp, setTmp ] = useState('')

	// UUID
	// const { uid } = props;
	const uid = '1345-1d45-ff1s-ab11';

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

	// Whenever dropdown value changes, make API request
	useEffect(() => {
		const pcoaImageEndpoint = '/report/pcoa'
		const getPcoaImage = async () => {
			const formData = new FormData();

			formData.append('uid', uid);
			formData.append('distance', distanceTypes[distanceOptionValue]);
			formData.append('column', columns[columnOptionValue]);

			const configOptions = {
	 			url: pcoaImageEndpoint,
	 			method: 'post',
	 			data: formData,
	 			responseType: 'arraybuffer'
	 		}

	 		/*
			const res = await axios.post(pcoaImageEndpoint, formData, {
	 			headers: {
	 				'Content-Type': 'multipart/form-data'
	 			}
	 		});
	 		*/
	 		const res = await axios(configOptions);

	 		/*
			const blob = new Blob([res.data])
			const url = URL.createObjectURL( blob );
			setTmp(url);
			*/

			
	 		const base64 = btoa(
	 			new Uint8Array(res.data).reduce( 
	 				(data, byte) => data + String.fromCharCode(byte), '' 
	 			)
	 		)

	 		console.log(base64)
	 		
	 		setTmp(base64)
	 		
		};
		if (Object.keys(columns).length !== 0 && Object.keys(distanceTypes).length !== 0) {
			getPcoaImage();
		}
		//getPcoaImage();
		
	}, [distanceOptionValue, columnOptionValue])

	const columnOptions = Object.keys(columns).map(column => {
		return(
			<option value={column} key={column}>{column}</option>
		)
	})
	const distanceOptions = Object.keys(distanceTypes).map(distanceType => {
		return(
			<option value={distanceType} key={distanceType}>{distanceType}</option>
		)
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		
		if(name === 'distanceType') {
			setDistanceOptionValue(value);
		} else if(name === 'columnType') {
			setColumnOptionValue(value);
		}
	}

	return(
		<div>
			<select
				name='distanceType'
				onChange={handleChange}
				value={distanceOptionValue}
			>
				{distanceOptions}
			</select>
			<select
				name='columnType'
				onChange={handleChange}
				value={columnOptionValue}
			>
				{columnOptions}
			</select>
			<img src={`data:image/jpeg;base64,${tmp}`} />
		</div>
	)
}

const mapStateToProps  = state => ({
	//uid: state.download.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(PcoaDropdown)
//<img src={`data:image/jpeg;base64,${tmp}`} />