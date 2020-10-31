import React from 'react';
import {
	useTable,
	usePagination,
	useSortBy
} from 'react-table';

import CssBaseline from '@material-ui/core/CssBaseline';

import Table from './Table';

//import './TableStyle.css'

function TableMain(props) {
	// From parent
	const { columns, data }  = props;

	return(
		<div className="table-wrapper">
			<CssBaseline />
			<Table
				columns={columns} 
				data={data}
			/>
		</div>
	)
}

export default TableMain