import React from 'react';

import {
	QIIME2_OFFICIAL_URL,
	SILVA_OFFICIAL_URL,
} from '../../ExternalLinks';

import { openInNewTab } from '../../utils/utils'

import './VersionInfoStyle.css';

function VersionInfoMain() {
	const QIIME2_RELEASE = process.env.REACT_APP_QIIME2_RELEASE
	const SILVA_VERSION = process.env.REACT_APP_SILVA_VERSION

	return(
		<div className="version-info-wrapper">
			<div className="version-info-item">
				<span className="version-info-header">QIIME2 version:</span>
				<span className="version-info-text">{QIIME2_RELEASE}</span>
				<span
					className="version-info-text clickable"
					onClick={()=>{openInNewTab(QIIME2_OFFICIAL_URL)}}
				>
					({QIIME2_OFFICIAL_URL})
				</span>
			</div>
			<div className="version-info-item">
				<span className="version-info-header">SILVA database version:</span>
				<span className="version-info-text">{SILVA_VERSION}</span>
				<span
					className="version-info-text clickable"
					onClick={()=>{openInNewTab(SILVA_OFFICIAL_URL)}}
				>
					({SILVA_OFFICIAL_URL})
				</span>
			</div>
		</div>
	)
}

export default VersionInfoMain