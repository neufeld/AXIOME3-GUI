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
} from '../../misc/EndpointConfig';

// Form types
import {
	PCOA_FORMTYPE,
	BUBBLEPLOT_FORMTYPE,
} from '../../misc/FormTypeConfig';

const getPngEndpoint = (formType) => {
	switch(formType) {
		case PCOA_FORMTYPE:
			return CUSTOM_PCOA_PNG_ENDPOINT
		case BUBBLEPLOT_FORMTYPE:
			return BUBBLEPLOT_PNG_ENDPOINT
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
		default:
			return "none"
	}
}

function ImagePreviewMain(props) {
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
		}

	}, [isWorkerDone])

	return(
		<div className="image-preview-wrapper">
			<img
				style={{display: (source === '') ? 'none' : 'block'}}
				src={`data:image/jpeg;base64,${source}`}
				className="image-preview-image"
			/>
			<ImageDownloadSection
				pngEndpoint={pngEndpoint}
				pdfEndpoint={pdfEndpoint}
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