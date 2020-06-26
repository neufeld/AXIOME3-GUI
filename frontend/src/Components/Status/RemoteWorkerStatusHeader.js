import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const useStyles = makeStyles({
	success: {
		color: 'green',
	},
	fail: {
		color: 'red',
	}
})

export const getHeaderStatus = (isWorkerQueued, isWorkerRunning, isWorkerDone, isWorkerFailed) => {
	let headerStatus;

	if(isWorkerDone === true) {
		headerStatus = "Task done running!";
	} else if(isWorkerFailed === true) {
		headerStatus = "Task failed..."
	} else if(isWorkerRunning === true) {
		headerStatus = "Task running..."
	} else if(isWorkerQueued === true){
		headerStatus = "Task queued..."
	} else {
		headerStatus = "Task not queued..."
	}

	return headerStatus
}

function RemoteWorkerStatusHeader(props) {
	// Redux states
	const { isWorkerQueued, isWorkerRunning, isWorkerDone, isWorkerFailed } = props;

	const headerStatus = getHeaderStatus(isWorkerQueued, isWorkerRunning, isWorkerDone, isWorkerFailed);

	const classes = useStyles();

	const statusEmote = (isWorkerDone === true) ?
		<SentimentSatisfiedAltIcon className={classes.success} fontSize='large'/> :
			(isWorkerFailed === true) ?
			<SentimentDissatisfiedIcon className={classes.fail} fontSize='large'/> :
			undefined

	return (
		<div className="worker-status-header-container">
			<p className="worker-status-header">Task Status: </p>
			<p className="worker-status">{headerStatus}</p>
			{statusEmote}
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerQueued: state.remoteWorker.isWorkerQueued,
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	isWorkerDone: state.remoteWorker.isWorkerDone,
	isWorkerFailed: state.remoteWorker.isWorkerFailed,
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerStatusHeader)