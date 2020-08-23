import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { convertArrayBufferToBase64 } from '../../utils/utils';

import ImageDownloadSection from './ImageDownloadSection';
import './ImagePreviewStyle.css';

// API endpoints
import {
	CUSTOM_PCOA_PNG_ENDPOINT,
	CUSTOM_PCOA_PDF_ENDPOINT,
	BUBBLEPLOT_PNG_ENDPOINT,
	BUBBLEPLOT_PDF_ENDPOINT,
	TRIPLOT_PNG_ENDPOINT,
	TRIPLOT_PDF_ENDPOINT,
	TRIPLOT_ENV_SUMMARY_ENDPOINT,
	TRIPLOT_SAMPLE_SUMMARY_ENDPOINT,
} from '../../misc/EndpointConfig';

// Form types
import {
	PCOA_FORMTYPE,
	BUBBLEPLOT_FORMTYPE,
	TRIPLOT_FORMTYPE,
} from '../../misc/FormTypeConfig';

const getPngEndpoint = (formType) => {
	switch(formType) {
		case PCOA_FORMTYPE:
			return CUSTOM_PCOA_PNG_ENDPOINT
		case BUBBLEPLOT_FORMTYPE:
			return BUBBLEPLOT_PNG_ENDPOINT
		case TRIPLOT_FORMTYPE:
			return TRIPLOT_PNG_ENDPOINT
		default:
			return "none"
	}
}

const getPdfEndpoint = (formType) => {
	switch(formType) {
		case PCOA_FORMTYPE:
			return CUSTOM_PCOA_PDF_ENDPOINT
		case BUBBLEPLOT_FORMTYPE:
			return BUBBLEPLOT_PDF_ENDPOINT
		case TRIPLOT_FORMTYPE:
			return TRIPLOT_PDF_ENDPOINT
		default:
			return "none"
	}
}

// For some reason, I can't get it to pass UID and re-render the child component properly
// i.e. Child component always takes empty UID even when it changes here
const getDownloadList = (formType) => {
	if(formType === PCOA_FORMTYPE) {
		const downloadList = [
			{
				header: '- PCoA plot (.png):',
				downloadPath: CUSTOM_PCOA_PNG_ENDPOINT,
				displayText: '.png',
			},
			{
				header: '- PCoA plot (.pdf):',
				downloadPath: CUSTOM_PCOA_PDF_ENDPOINT,
				displayText: '.pdf',
			},
		]
		return downloadList
	} else if(formType === BUBBLEPLOT_FORMTYPE) {
		const downloadList = [
			{
				header: '- Bubble plot (.png):',
				downloadPath: BUBBLEPLOT_PNG_ENDPOINT,
				displayText: '.png',
			},
			{
				header: '- Bubble plot (.pdf):',
				downloadPath: BUBBLEPLOT_PDF_ENDPOINT,
				displayText: '.pdf',
			},
		]
		return downloadList
	} else if(formType === TRIPLOT_FORMTYPE) {
		const downloadList = [
			{
				header: '- Triplot (.png):',
				downloadPath: TRIPLOT_PNG_ENDPOINT,
				displayText: '.png',
			},
			{
				header: '- Triplot (.pdf):',
				downloadPath: TRIPLOT_PDF_ENDPOINT,
				displayText: '.pdf',
			},
			{
				header: '- Sample summary (.csv):',
				downloadPath: TRIPLOT_SAMPLE_SUMMARY_ENDPOINT,
				displayText: '.csv',
			},
			{
				header: '- Environmental data summary (.csv):',
				downloadPath: TRIPLOT_ENV_SUMMARY_ENDPOINT,
				displayText: '.csv',
			},
		]
		return downloadList
	}
}

// handle failed POST request?
export function ImagePreviewMain(props) {
	const [ source, setSource ] = useState('')
	// Redux state
	const { isWorkerDone, uid, formType } = props;

	const pngEndpoint = getPngEndpoint(formType)
	const pdfEndpoint = getPdfEndpoint(formType)

	useEffect(() => {
		const getPcoaImage = async () => {
			const formData = new FormData();

			formData.append('uid', uid);

			const configOptions = {
				url: pngEndpoint,
				method: 'post',
				data: formData,
				responseType: 'arraybuffer'
			}
			const res = await axios(configOptions);

			const base64 = convertArrayBufferToBase64(res.data);

			setSource(base64)
		};

		if(formType !== '' && isWorkerDone === true) {
			getPcoaImage()
		} else {
			setSource('')
		}

	}, [isWorkerDone])

	const downloadList = getDownloadList(formType)

	return(
		<div
			style={{display: (isWorkerDone == true) ? 'flex' : 'none'}}
			className="image-preview-wrapper"
		>
			<img
				style={{display: (source === '') ? 'none' : 'block'}}
				src={`data:image/jpeg;base64,${source}`}
				className="image-preview-image"
			/>
			<ImageDownloadSection
				downloadList={downloadList}
			/>
		</div>
	)
}

const mapStateToProps  = state => ({
	isWorkerDone: state.remoteWorker.isWorkerDone,
	uid: state.submit.uid,
	formType: state.submit.formType,
	downloadPath: state.download.downloadPath
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreviewMain)