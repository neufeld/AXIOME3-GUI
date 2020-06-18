import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import GeneralHeader from '../GeneralHeader';
import { QIIME2_VIEWER_URL } from '../../../ExternalLinks';
import { openInNewTab } from '../../../utils/utils';

//Routes
import {
	ANALYSIS_ROUTE,
} from '../../../RouteConfig';

import { 
	SAMPLING_DEPTH_HELP,
} from '../../../misc/OptionHelpConfig';

const recommendationHeaderStyle = {
	display: 'inline-block',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
	marginBottom: '5px',
};

const CustomToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

function DenoiseRecommendation() {
	return(
		<div>
			<GeneralHeader
				header="Recommended Analysis Steps"
				style={recommendationHeaderStyle}
			/>
			<div className="report-denoise-recommendation-wrapper">
				<div className="report-denoise-recommendation-container">
					<p className="report-denoise-recommendation-step">
						1. Download "Feature Table (.qza)" and "Representative Sequences (.qza)".
					</p>
				</div>
				<div className="report-denoise-recommendation-container">
					<p className="report-denoise-recommendation-step">
						2. Examine "Sample Count Summary" to choose appropriate
						<CustomToolTip title={SAMPLING_DEPTH_HELP} placement="right" arrow>
							<span className="clickable" style={{marginLeft: "5px"}}>sampling depth.</span>
						</CustomToolTip>
					</p>
				</div>
				<div className="report-denoise-recommendation-container">
					<p className="report-denoise-recommendation-step">
						3. 
							<span
								className="clickable"
								onClick={() => {openInNewTab('#'+ANALYSIS_ROUTE)}}
								style={{marginLeft: '6px'}}
							>
								Furthur analyze samples.
							</span>
					</p>
				</div>
				<div className="report-denoise-recommendation-container">
					<p className="report-denoise-recommendation-step">
						4. You may download "Denoise Summary (.qzv)" and examine denoise stats using
						<a
							href={QIIME2_VIEWER_URL}
							target="_blank"
							style={{marginLeft: '8px'}}
							rel="noopener noreferrer"
						>
							QIIME2 Viewer
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default DenoiseRecommendation