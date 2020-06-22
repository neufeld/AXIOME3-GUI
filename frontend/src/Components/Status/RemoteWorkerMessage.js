import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CircularFeedback from './CircularFeedback';

import GeneralHeader from '../Report/GeneralHeader';
import DownloadButton from '../Download/DownloadButton';

import {
	INPUT_UPLOAD_FORMTYPE,
	DENOISE_FORMTYPE,
} from '../../misc/FormTypeConfig';

import {
	SEQUENCE_QZA_ENDPOINT,
	SEQUENCE_QZV_ENDPOINT,
	FEATURE_TABLE_ENDPOINT,
	REP_SEQS_ENDPOINT,
	SUMMARY_QZV_ENDPOINT,
} from '../../misc/EndpointConfig';

import {
	REPORT_BASE_ROUTE,
} from '../../RouteConfig';

const DownloadButtonStyle = {
	display: 'inline-block'
}

const DownloadHeaderStyle = {
	display: 'inline-block',
	margin: '0px 10px',
	fontWeight: 'bold'
};

const DownloadMainHeader = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
}

const getDownloadItems = (formType) => {
	if(formType === INPUT_UPLOAD_FORMTYPE) {
		const items = [
			{
				header: "- Sequences:",
				downloadPath: SEQUENCE_QZA_ENDPOINT,
				extension: 'qza'
			},
			{
				header: "- Sequences Visualization:",
				downloadPath: SEQUENCE_QZV_ENDPOINT,
				extension: 'qzv',
			}
		]

		return items;
	} else if(formType === DENOISE_FORMTYPE) {
		const items = [
			{
				header: "- Feature Table:",
				downloadPath: FEATURE_TABLE_ENDPOINT,
				extension: 'qza'
			},
			{
				header: "- Representative Sequences:",
				downloadPath: REP_SEQS_ENDPOINT,
				extension: 'qza',
			},
			{
				header: "- Denoise Summary:",
				downloadPath: SUMMARY_QZV_ENDPOINT,
				extension: 'qzv',
			},
		]

		return items;
	} else {
		return [];
	}
}

function RemoteWorkerMessage(props) {
	// Redux remoteWorker state
	const { isWorkerRunning, isWorkerDone, isWorkerFailed, workerMessages } = props;

	// Redux submit states
	const { uid, formType } = props;

	// Redux option states
	const { selectedOptions } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	const messageList = workerMessages.map((msg, idx) => {
		if(msg) {
			if(idx === (workerMessages.length - 1)){
				if(isWorkerRunning) {
					return(
						<div className="worker-message-item" key={idx}>
							<p className="worker-message-current" key={msg}>{msg}</p>
							<CircularFeedback />
						</div>
					)
				} else if(isWorkerDone || isWorkerFailed) {
					return(
						<div className="worker-message-item" key={idx}>
							<p className="worker-message-current" key={msg}>{msg}</p>
						</div>
					)
				}				
			} else {
				return(
					<div className="worker-message-item" key={idx}>
						<p className="worker-message-prev" key={msg}>{msg}</p>
					</div>
				)
			}	
		}
	})

	const downloadItems = getDownloadItems(formType)

	const downloadSection = downloadItems.map(item => {
		return(
			<div className="download-container" key={item.header}>
				<GeneralHeader
					header={item.header}
					style={DownloadHeaderStyle}
				/>
				<DownloadButton
					style={DownloadButtonStyle}
					qiimeDownloadPath={item.downloadPath}
					isQza={true}
					qiimeText={item.extension}
					inputField={inputField}
				/>
			</div>
		)
	})

	const formTypeRoute = 'formType=' + formType;
	const uidRoute = 'uid=' + uid;
	var reportRoute = REPORT_BASE_ROUTE + '?' + uidRoute + '&' + formTypeRoute
	// Append options to query string
	Object.keys(selectedOptions).forEach(k => {
		reportRoute = reportRoute + '&' + k + '=' + selectedOptions[k]
	});

	const shouldDisplayExtra = (formType === INPUT_UPLOAD_FORMTYPE || formType === DENOISE_FORMTYPE) ? true : false

	return (
		<div
			className="worker-message-container"
			style={{display: (workerMessages.length > 0) ? 'block' : 'none'}}
		>
			{messageList}
			<div
				className="worker-message-current"
				style={{display: (isWorkerDone && shouldDisplayExtra) ? 'block' : 'none'}}
			>
				<GeneralHeader
					header={"File downloads"}
					style={DownloadMainHeader}
				/>
				{downloadSection}
				<div className="worker-message-report-route">
					<Link to={reportRoute}>
						View Report
					</Link>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerRunning: state.remoteWorker.isWorkerRunning,
	isWorkerDone: state.remoteWorker.isWorkerDone,
	isWorkerFailed: state.remoteWorker.isWorkerFailed,
	workerMessages: state.remoteWorker.workerMessages,
	uid: state.submit.uid,
	formType: state.submit.formType,
	selectedOptions: state.option.selectedOptions,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWorkerMessage)