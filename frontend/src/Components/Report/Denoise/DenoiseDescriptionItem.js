import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import GeneralHeader from '../GeneralHeader';

const CustomToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

const optionLabelStyle = {
	display: 'inline',
	fontWeight: 'bold',
	marginRight: '8px',
}

// Parent component: DenoiseDescription.js
function DenoiseDescriptionItem(props) {
	// Props from parents
	const { optionLabel, optionValue, helpText } = props;
	return(
		<div className="report-denoise-description-child">
			<GeneralHeader header={optionLabel+':'} style={optionLabelStyle} />
			<span className="report-denoise-description-text">{optionValue}</span>
			<CustomToolTip title={helpText} placement="right" arrow>
				<HelpOutlineOutlinedIcon/>
			</CustomToolTip>
		</div>
	)
}

export default DenoiseDescriptionItem