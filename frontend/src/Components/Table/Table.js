import React from 'react';
import {
	useTable,
	usePagination,
	useSortBy
} from 'react-table';

import { makeStyles } from '@material-ui/core/styles';

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper';

import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles((theme) => ({
  header: {
  	fontWeight: 'bold',
  }
}));

// Copied from react-table simple example
function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	 const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useSortBy,
		usePagination
	)

	const handleChangePage = (e, newPage) => {
		gotoPage(newPage)
	}
	
	const handleChangeRowsPerPage = (e) => {
		setPageSize(Number(e.target.value))
	}

	const classes = useStyles();

	// Render the UI for your table
	return (
		<TableContainer component={Paper}>
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell
									className={classes.header}
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render('Header')}
									<TableSortLabel
										active={column.isSorted}
										direction={column.isSortedDesc ? 'desc' : 'asc'}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>

				<TableBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<TableCell
											{...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</TableCell>
									)
								})}
							</TableRow>
						)
					})}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[
								5,
								10,
								25,
								{ label: 'All', value: data.length },
							]}
							colSpan={0}
							count={data.length}
							rowsPerPage={pageSize}
							page={pageIndex}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>

			</MaUTable>
		</TableContainer>
	)
}

export default Table