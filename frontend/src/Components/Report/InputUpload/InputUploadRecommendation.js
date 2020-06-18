import React from 'react';

import GeneralHeader from '../GeneralHeader';
import { QIIME2_VIEWER_URL } from '../../../ExternalLinks';
import { openInNewTab } from '../../../utils/utils';

//Routes
import {
	DENOISE_ROUTE,
} from '../../../RouteConfig';

// Local images
import qiime2ViewStepOne from './qiime2_view_1.png';
import forwardRead from './forward.png';
import reverseRead from './reverse.png';

const recommendationHeaderStyle = {
	display: 'inline-block',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
	marginBottom: '5px',
};

function InputUploadRecommendation() {
	return(
		<div>
			<GeneralHeader
				header={"Recommended Analysis Steps"}
				style={recommendationHeaderStyle}
			/>
			<div>
				<ol>
					<li><p>Download "QIIME2 Visualization (.qzv)" file</p></li>
					<li>
						<p>
							Open QIIME2 Viewer:
							<a
								href={QIIME2_VIEWER_URL}
								target="_blank"
								style={{marginLeft: '8px'}}
								rel="noopener noreferrer"
							>
								QIIME2 Viewer
							</a>
						</p>
					</li>
					<li><p>Upload the "QIIME2 Visualization (.qzv)" file in the QIIME2 Viewer</p></li>
					<li>
						<p>Click "Interactive Quality Plot"</p>
						<img src={qiime2ViewStepOne} width="900" height="500"/>
					</li>
					<li>
						<p>Examine quality scores in the forward reads. In the example below, most reads have high quality scores at all bases.</p>
						<img src={forwardRead} width="900" height="500"/>
					</li>
					<li>
						<p>Examine quality scores in the reverse reads. In the example below, quality score is consistently low in most reads starting at base 240.</p>
						<img src={reverseRead} width="900" height="500"/>
					</li>
					<li>
						<p>
							Download "QIIME2 Artifact", and 
							<span
								className="clickable"
								onClick={() => {openInNewTab('#'+DENOISE_ROUTE)}}
								style={{marginLeft: '6px'}}
							>
								denoise samples to generate feature table.
							</span>
						</p>
					</li>
				</ol>
			</div>
		</div>
	)
}

export default InputUploadRecommendation