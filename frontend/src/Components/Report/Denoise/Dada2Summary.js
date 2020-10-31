import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TableMain from '../../Table/TableMain';
import GeneralHeader from '../GeneralHeader';

import { ENDPOINT_ROOT } from '../../../misc/apiConfig';

import {
	DADA2_SUMMARY_ENDPOINT,
} from '../../../misc/EndpointConfig';

const sampleSummaryHeader = {
	fontSize: '20px',
	fontWeight: 'bold',
	marginBottom: '20px',
	fontVariant: 'small-caps',
}

function Dada2Summary(props) {
	// Redux state
	const { uid } = props;

	// Local state
	const [ tableData, setTableData ] = useState([]);

	useEffect(() => {
		const dada2SummaryEndpoint = ENDPOINT_ROOT + DADA2_SUMMARY_ENDPOINT;

		const sampleSummaryApiRequest = async () => {
			const formData = new FormData();
			const data	= [];

			formData.append('uid', uid);

			const configOptions = {
				url: dada2SummaryEndpoint,
				method: 'post',
				data: formData,
				responseType: 'json'
			}
			const res = await axios(configOptions);
			const dada2Summary = res.data;

			Object.keys(dada2Summary).forEach(sampleId => {
				const row = {
					sampleId: sampleId,
					input: dada2Summary[sampleId]["input"],
					filtered: dada2Summary[sampleId]["filtered"],
					filtered_percent: dada2Summary[sampleId]["percentage of input passed filter"]+"%",
					denoised: dada2Summary[sampleId]["denoised"],
					merged: dada2Summary[sampleId]["merged"],
					merged_percent: dada2Summary[sampleId]["percentage of input merged"]+"%",
					non_chimeric: dada2Summary[sampleId]["non-chimeric"],
					non_chimeric_percent: dada2Summary[sampleId]["percentage of input non-chimeric"]+"%",
				}
				data.push(row);
			})
			setTableData(data);
		}

		sampleSummaryApiRequest();
	}, [])

	const columns = useMemo(
		() => [
			{
				Header: 'Sample ID',
				accessor: 'sampleId',
			},
			{
				Header: 'Input',
				accessor: 'input',
			},
			{
				Header: 'Filtered',
				accessor: 'filtered',
			},
			{
				Header: 'Percentage of input passed filter',
				accessor: 'filtered_percent',
			},
			{
				Header: 'Denoised',
				accessor: 'denoised',
			},
			{
				Header: 'Merged',
				accessor: 'merged',
			},
			{
				Header: 'Percentage of input merged',
				accessor: 'merged_percent',
			},
			{
				Header: 'Non-chimeric',
				accessor: 'non_chimeric',
			},
			{
				Header: 'Percentage of input non-chimeric',
				accessor: 'non_chimeric_percent',
			},
		],
		[]
	)

	return(
		<div className="report-denoise-dada2-summary-wrapper">
			<GeneralHeader
				header="DADA2 Denoise Summary"
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

export default connect(mapStateToProps, mapDispatchToProps)(Dada2Summary)