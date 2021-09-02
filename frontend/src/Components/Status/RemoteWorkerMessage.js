import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CircularFeedback from './CircularFeedback';

import GeneralHeader from '../Report/GeneralHeader';
import DownloadButton from '../Download/DownloadButton';

import { capitalizeFirstLetter } from '../Report/ReportHelper';

import {
	INPUT_UPLOAD_FORMTYPE,
	DENOISE_FORMTYPE,
	ANALYSIS_FORMTYPE,
	TAXONOMIC_CLASSIFICATION_FORMTYPE,
} from '../../misc/FormTypeConfig';

import {
	SEQUENCE_QZA_ENDPOINT,
	SEQUENCE_QZV_ENDPOINT,
	FEATURE_TABLE_ENDPOINT,
	REP_SEQS_ENDPOINT,
	SUMMARY_QZV_ENDPOINT,
	REPORT_TAXA_ASV_QZA_ENDPOINT,
	REPORT_TAXA_COLLAPSE_TSV_ENDPOINT,
	BATCH_DOWNLOAD_ENDPOINT,
	BETA_DIVERSITY_ENDPOINT,
	ALPHA_DIVERSITY_QZA_ENDPOINT,
} from '../../misc/EndpointConfig';

import {
	REPORT_BASE_ROUTE,
} from '../../RouteConfig';

import { ENDPOINT_ROOT } from '../../misc/apiConfig';

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

const getDownloadItems = (formType, uid) => {
	if(formType === INPUT_UPLOAD_FORMTYPE) {
		const inputField = [
			{name: 'uid', value: uid}
		];

		const items = [
			{
				header: "- Sequences:",
				downloadPath: ENDPOINT_ROOT + SEQUENCE_QZA_ENDPOINT,
				extension: 'qza',
				inputField: inputField,
			},
			{
				header: "- Sequences Visualization:",
				downloadPath: ENDPOINT_ROOT + SEQUENCE_QZV_ENDPOINT,
				extension: 'qzv',
				inputField: inputField,
			},
			{
				header: "- Download All:",
				downloadPath: ENDPOINT_ROOT + BATCH_DOWNLOAD_ENDPOINT,
				extension: 'zip',
				inputField: inputField,
			},
		]

		return items;
	} else if(formType === DENOISE_FORMTYPE) {
		const inputField = [
			{name: 'uid', value: uid}
		];

		const items = [
			{
				header: "- Feature Table:",
				downloadPath: ENDPOINT_ROOT + FEATURE_TABLE_ENDPOINT,
				extension: 'qza',
				inputField: inputField,
			},
			{
				header: "- Representative Sequences:",
				downloadPath: ENDPOINT_ROOT + REP_SEQS_ENDPOINT,
				extension: 'qza',
				inputField: inputField,
			},
			{
				header: "- Denoise Summary:",
				downloadPath: ENDPOINT_ROOT + SUMMARY_QZV_ENDPOINT,
				extension: 'qzv',
				inputField: inputField,
			},
			{
				header: "- Download All:",
				downloadPath: ENDPOINT_ROOT + BATCH_DOWNLOAD_ENDPOINT,
				extension: 'zip',
				inputField: inputField,
			},
		]

		return items;
	} else if(formType === TAXONOMIC_CLASSIFICATION_FORMTYPE) {
		const inputField = [
			{name: 'uid', value: uid}
		];

		const taxa_list = ['domain', 'phylum', 'class', 'order', 'family', 'genus', 'species'];

		const taxaCollapseDownloads = taxa_list.map(taxa => {
			const header = '- ' + capitalizeFirstLetter(taxa) + ':'
			const inputField = [
				{name: 'uid', value: uid},
				{name: 'taxa', value: taxa}
			];

			return {
				header: header,
				downloadPath: ENDPOINT_ROOT + REPORT_TAXA_COLLAPSE_TSV_ENDPOINT,
				extension: 'tsv',
				inputField: inputField,
			}
			
		});

		var taxaDownloads = [
			{
				header: "- Taxonomy (.qza):",
				downloadPath: ENDPOINT_ROOT + REPORT_TAXA_ASV_QZA_ENDPOINT,
				extension: 'qza',
				inputField: inputField,
			},
		]

		const items = [...taxaDownloads, ...taxaCollapseDownloads]

		return items;
	} else if(formType === ANALYSIS_FORMTYPE) {
		const inputField = [
			{name: 'uid', value: uid}
		];

		const betaDiversities = {
			unweighted_unifrac_distance: "Unweighted UniFrac distance",
			unweighted_unifrac_pcoa: "Unweighted UniFrac PCoA ordination",
			weighted_unifrac_distance: "Weighted UniFrac distance",
			weighted_unifrac_pcoa: "Weighted UniFrac PCoA ordination",
			bray_curtis_distance: "Bray-Curtis distance",
			bray_curtis_pcoa: "Bray-Curtis PCoA ordination",
			jaccard_distance: "Jaccard distance",
			jaccard_pcoa: "Jaccard PCoA ordination",	
		};

		const betaDiversityDownloads = Object.keys(betaDiversities).map(diversity => {
			const inputField = [
				{name: 'uid', value: uid},
				{name: 'beta_diversity', value: diversity}
			];

			const header = "- " + betaDiversities[diversity] + ": ";

			return {
				header: header,
				downloadPath: ENDPOINT_ROOT + BETA_DIVERSITY_ENDPOINT,
				extension: 'qza',
				inputField: inputField,
			}
		});

		const all = [
			{
				header: "- Download All:",
				downloadPath: ENDPOINT_ROOT + BATCH_DOWNLOAD_ENDPOINT,
				extension: 'zip',
				inputField: inputField,
			},
		]

		const items = [...betaDiversityDownloads, ...all, ]

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

	const downloadItems = getDownloadItems(formType, uid)

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
					inputField={item.inputField}
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

	const shouldDisplayExtra = (formType === INPUT_UPLOAD_FORMTYPE || formType === DENOISE_FORMTYPE || formType === ANALYSIS_FORMTYPE || formType === TAXONOMIC_CLASSIFICATION_FORMTYPE) ? true : false

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
			</div>
			<div
				className="worker-message-current"
				style={{display: (isWorkerDone && shouldDisplayExtra) ? 'block' : 'none'}}
			>
				<div className="worker-message-report-route">
					<Link to={reportRoute}>
						View Report
					</Link>
				</div>
				<div>
					<p>Currently, large files (size > 300MB) downloads are disabled due to a bug...</p>
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