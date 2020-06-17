import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import GeneralHeader from '../GeneralHeader';
import DenoiseDescriptionItem from './DenoiseDescriptionItem';

import { 
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
} from '../../../misc/OptionLabelConfig';

import { 
	TRUNC_LEN_F_HELP,
	TRUNC_LEN_R_HELP,
	TRIM_LEFT_F_HELP,
	TRIM_LEFT_R_HELP,
} from '../../../misc/OptionHelpConfig';

import denoiseSample from './denoise_sample.png';

const descriptionHeaderStyle = {
	fontSize: '20px',
	fontWeight: 'bold',
	marginBottom: '20px',
	fontVariant: 'small-caps',
}

function DenoiseDescription(props) {
	const parsed = qs.parse(props.location.search);
	// Denoise specific User specified options
	const truncLenF = parsed[TRUNC_LEN_F];
	const truncLenR = parsed[TRUNC_LEN_R];
	const trimLeftF = parsed[TRIM_LEFT_F];
	const trimLeftR = parsed[TRIM_LEFT_R];

	return(
		<div>
			<GeneralHeader
				header={"User options"}
				style={descriptionHeaderStyle}
			/>
			<div className="report-denoise-description-wrapper">
				<div className="report-denoise-description-parent">
					<DenoiseDescriptionItem
						optionLabel={TRIM_LEFT_F}
						optionValue={trimLeftF}
						helpText={TRIM_LEFT_F_HELP}
					/>
					<DenoiseDescriptionItem
						optionLabel={TRIM_LEFT_R}
						optionValue={trimLeftR}
						helpText={TRIM_LEFT_R_HELP}
					/>
					<DenoiseDescriptionItem
						optionLabel={TRUNC_LEN_F}
						optionValue={truncLenF}
						helpText={TRUNC_LEN_F_HELP}
					/>
					<DenoiseDescriptionItem
						optionLabel={TRUNC_LEN_R}
						optionValue={truncLenR}
						helpText={TRUNC_LEN_R_HELP}
					/>
				</div>
				<div className="report-denoise-sample-pic-container">
					<img src={denoiseSample} width="800" height="400"/>
				</div>
			</div>
		</div>
	)
}

export default withRouter(DenoiseDescription)