import React from 'react'
import ReactTooltip from "react-tooltip";

import { handleHelpClick } from '../../redux/actions/optionAction'
import { handleHelpHover } from '../../redux/actions/optionAction'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export const getTooltipText = (label) => {
	switch(label) {
		case "Sample Type":
			return "foo"
		case "Input Format":
			return ""
		default:
			return "baz"
	}
}

function OptionHelp(props) {
	const { label } = props;

	const tooltipText = getTooltipText(label)

	return(
		<div className="option-help-container">
			<HelpOutlineOutlinedIcon
				data-tip={tooltipText}
			/>
			<ReactTooltip />
		</div>
	)
}

export default OptionHelp