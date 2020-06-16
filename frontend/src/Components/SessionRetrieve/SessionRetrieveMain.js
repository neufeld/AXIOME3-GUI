import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import { handleRetrieveSession } from '../SubmitButton/SubmitHelper'
import { retrieveSession } from '../../redux/actions/submitAction'
import { updateInputSessionId, resetRemoteWorker } from '../../redux/actions/remoteWorkerAction';

import './SessionRetrieveStyle.css';

import {
	SESSION_RETRIEVE_HELP,
} from '../../misc/OptionHelpConfig';

const CustomToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

function SessionRetrieve(props) {
	// Redux states
	const { isWorkerRunning, isSubmitting, inputSessionId } = props;

	// Redux actions
	const { retrieveSession, updateInputSessionId, resetRemoteWorker } = props;

	const handleChange = (e) => {
		const { value } = e.target;

		updateInputSessionId(value)
	}

	return(
		<div className="session-retrieve-container">
			<form onSubmit={(e) => {resetRemoteWorker(); handleRetrieveSession(e, inputSessionId, retrieveSession)}}>
				<div className="session-retrieve-input-container">
					<TextField
						variant="outlined"
						name="sessionID"
						value={inputSessionId}
						placeholder={"Enter Session ID..."}
						fullWidth={true}
						onChange={(e) => {handleChange(e)}}
					/>
				</div>
				<div className="session-retrieve-btn-container">
					<Button
						variant="contained"
						disabled={( (isWorkerRunning === true) || (isSubmitting === true) )}
						type="submit"
						fullWidth={true}
						startIcon={<GetAppIcon/>}
					>
					Load Session
					</Button>
				</div>
				<CustomToolTip title={SESSION_RETRIEVE_HELP} placement="top-start" arrow>
					<HelpOutlineOutlinedIcon fontSize={"large"}/>
				</CustomToolTip>
			</form>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	isSubmitting: state.submit.isSubmitting,
	inputSessionId: state.remoteWorker.inputSessionId,
})

const mapDispatchToProps = {
	retrieveSession,
	updateInputSessionId,
	resetRemoteWorker,
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionRetrieve)