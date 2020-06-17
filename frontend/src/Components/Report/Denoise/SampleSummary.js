import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TableMain from '../../Table/TableMain';
import GeneralHeader from '../GeneralHeader';

const sampleSummaryHeader = {
	fontSize: '20px',
	fontWeight: 'bold',
	marginBottom: '20px',
	fontVariant: 'small-caps',
}

function SampleSummary(props) {
	// Redux state
	const { uid } = props;

	// Local state
	const [ tableData, setTableData ] = useState([]);

	useEffect(() => {
		const denoiseSampleSummaryEndpoint = '/denoise/sample_summary/json';

		const sampleSummaryApiRequest = async () => {
			const formData = new FormData();
			const data	= [];

			formData.append('uid', uid);

			const configOptions = {
				url: denoiseSampleSummaryEndpoint,
				method: 'post',
				data: formData,
				responseType: 'json'
			}
			const res = await axios(configOptions);
			const summaryCounts = res.data;

			Object.keys(summaryCounts).forEach(sampleId => {
				const row = {
					sampleId: sampleId,
					sampleCount: summaryCounts[sampleId],
				}
				data.push(row);
			})
			setTableData(data);
		}

		sampleSummaryApiRequest();
	}, [])

	const columns = [
		{
			Header: 'Sample ID',
			accessor: 'sampleId',
		},
		{
			Header: 'Sample Count',
			accessor: 'sampleCount',
		},
	]

	return(
		<div>
			<GeneralHeader
				header="Sample Count Summary"
				style={sampleSummaryHeader}
			/>
			<TableMain columns={columns} data={tableData} />
		</div>
	)
}
const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleSummary)