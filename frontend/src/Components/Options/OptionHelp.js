import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { handleHelpClick } from '../../redux/actions/optionAction'
import { handleHelpHover } from '../../redux/actions/optionAction'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import {
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
} from '../../misc/OptionLabelConfig';

import { 
	TRUNC_LEN_F_HELP,
	TRUNC_LEN_R_HELP,
	TRIM_LEFT_F_HELP,
	TRIM_LEFT_R_HELP,
} from '../../misc/OptionHelpConfig';

export const getTooltipText = (label) => {
	switch(label) {
		case SAMPLE_TYPE:
			return "foo"
		case INPUT_FORMAT:
			return "bar"
		case TRIM_LEFT_F:
			return TRIM_LEFT_F_HELP
		case TRIM_LEFT_R:
			return TRIM_LEFT_R_HELP
		case TRUNC_LEN_F:
			return TRUNC_LEN_F_HELP
		case TRUNC_LEN_R:
			return TRUNC_LEN_R_HELP
		default:
			return "baz"
	}
}

const CustomToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

function OptionHelp(props) {
	const { label } = props;

	const tooltipText = getTooltipText(label)

	return(
		<div className="option-help-container">
			<CustomToolTip title={tooltipText} placement="top-start" arrow>
				<HelpOutlineOutlinedIcon/>
			</CustomToolTip>
		</div>
	)
}

export default OptionHelp