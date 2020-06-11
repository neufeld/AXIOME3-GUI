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
	SAMPLING_DEPTH,
	PRIMARY_TARGET,
	SECONDARY_TARGET,
	ALPHA,
	STROKE,
	POINT_SIZE,
} from '../../misc/OptionLabelConfig';

import {
	SAMPLE_TYPE_HELP,
	INPUT_FORMAT_HELP,
	TRUNC_LEN_F_HELP,
	TRUNC_LEN_R_HELP,
	TRIM_LEFT_F_HELP,
	TRIM_LEFT_R_HELP,
	SAMPLING_DEPTH_HELP,
	PRIMARY_TARGET_HELP,
	SECONDARY_TARGET_HELP,
	ALPHA_HELP,
	STROKE_HELP,
	POINT_SIZE_HELP,
	MORE_DETAIL,
} from '../../misc/OptionHelpConfig';

export const getTooltipText = (label) => {
	switch(label) {
		case SAMPLE_TYPE:
			return SAMPLE_TYPE_HELP
		case INPUT_FORMAT:
			return INPUT_FORMAT_HELP + " " + MORE_DETAIL
		case TRIM_LEFT_F:
			return TRIM_LEFT_F_HELP + " " + MORE_DETAIL
		case TRIM_LEFT_R:
			return TRIM_LEFT_R_HELP + " " + MORE_DETAIL
		case TRUNC_LEN_F:
			return TRUNC_LEN_F_HELP + " " + MORE_DETAIL
		case TRUNC_LEN_R:
			return TRUNC_LEN_R_HELP + " " + MORE_DETAIL
		case SAMPLING_DEPTH:
			return SAMPLING_DEPTH_HELP + " " + MORE_DETAIL
		case PRIMARY_TARGET:
			return PRIMARY_TARGET_HELP
		case SECONDARY_TARGET:
			return SECONDARY_TARGET_HELP
		case ALPHA:
			return ALPHA_HELP
		case STROKE:
			return STROKE_HELP
		case POINT_SIZE:
			return POINT_SIZE_HELP
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