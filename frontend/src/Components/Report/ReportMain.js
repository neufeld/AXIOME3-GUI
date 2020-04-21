import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import DownloadFile from './DownloadFile';
import TaxonomicClassification from './TaxonomicClassification';
import CombinedASVTable from './CombinedASVTable';


function ReportMain(props) {
	const endpoint = '/report/'
	useEffect(() => {
		// API call
		/*
		console.log("m")
		const getData = async () => {
			try {
				const res = await axios.post(endpoint)
				console.log(res)
				let blob = new Blob([res.data], { type: 'application/octet-stream' })
				let downloadUrl = window.URL.createObjectURL(blob)

				let a = document.createElement("a");
		    if (typeof a.download === "undefined") {
		        window.location.href = downloadUrl;
		    } else {
		        a.href = downloadUrl;
		        a.download = "tmp.qzv";
		        document.body.appendChild(a);
		        a.click();
		    }
			} catch(err) {
				console.log(err)
			}
		}
		getData();
		*/
	}, [])

	return(
		<div>
			<TaxonomicClassification />
			<CombinedASVTable />
			<DownloadFile downloadPath={props.downloadPath} key={props.downloadPath}/>
		</div>
	)
}

const mapStateToProps  = state => ({
	downloadPath: state.download.downloadPath
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMain)