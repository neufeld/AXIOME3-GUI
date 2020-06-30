import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import {
	CORES,
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	SAMPLING_DEPTH,
	PRIMARY_TARGET,
	SECONDARY_TARGET,
	COLOUR_BREWER,
	ALPHA,
	STROKE,
	POINT_SIZE,
	PLOT_WIDTH,
	PLOT_HEIGHT,
	PC_AXIS_ONE,
	PC_AXIS_TWO,
	X_AXIS_LABEL_SIZE,
	Y_AXIS_LABEL_SIZE,
	LEGEND_TITLE_SIZE,
	LEGEND_TEXT_SIZE,
} from '../../misc/OptionLabelConfig';

import {
	CORES_HELP,
	SAMPLE_TYPE_HELP,
	INPUT_FORMAT_HELP,
	TRUNC_LEN_F_HELP,
	TRUNC_LEN_R_HELP,
	TRIM_LEFT_F_HELP,
	TRIM_LEFT_R_HELP,
	SAMPLING_DEPTH_HELP,
	PRIMARY_TARGET_HELP,
	SECONDARY_TARGET_HELP,
	COLOUR_BREWER_HELP,
	ALPHA_HELP,
	STROKE_HELP,
	POINT_SIZE_HELP,
	PLOT_WIDTH_HELP,
	PLOT_HEIGHT_HELP,
	PC_AXIS_ONE_HELP,
	PC_AXIS_TWO_HELP,
	X_AXIS_LABEL_SIZE_HELP,
	Y_AXIS_LABEL_SIZE_HELP,
	LEGEND_TITLE_SIZE_HELP,
	LEGEND_TEXT_SIZE_HELP,
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
		case COLOUR_BREWER:
			return COLOUR_BREWER_HELP
		case ALPHA:
			return ALPHA_HELP
		case STROKE:
			return STROKE_HELP
		case POINT_SIZE:
			return POINT_SIZE_HELP
		case PLOT_WIDTH:
			return PLOT_WIDTH_HELP
		case PLOT_HEIGHT:
			return PLOT_HEIGHT_HELP
		case PC_AXIS_ONE:
			return PC_AXIS_ONE_HELP
		case PC_AXIS_TWO:
			return PC_AXIS_TWO_HELP
		case X_AXIS_LABEL_SIZE:
			return X_AXIS_LABEL_SIZE_HELP
		case Y_AXIS_LABEL_SIZE:
			return Y_AXIS_LABEL_SIZE_HELP
		case LEGEND_TITLE_SIZE:
			return LEGEND_TITLE_SIZE_HELP
		case LEGEND_TEXT_SIZE:
			return LEGEND_TEXT_SIZE_HELP
		case CORES:
			return CORES_HELP
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
		<CustomToolTip title={tooltipText} placement="top-start" arrow>
			<HelpOutlineOutlinedIcon/>
		</CustomToolTip>
	)
}

export default OptionHelp