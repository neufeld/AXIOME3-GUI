import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { selectOptions } from '../../redux/actions/optionAction';

import {
	EMAIL,
} from '../../misc/OptionLabelConfig';

import {
	EMAIL_HELP,
} from '../../misc/OptionHelpConfig';

import './EmailStyle.css';

const CustomToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 400,
		fontSize: '14px',
		border: '1px solid #dadde9',
	},
}))(Tooltip)

function EmailMain(props) {
	// redux action
	const { selectOptions } = props;

	// redux state
	const { selectedOptions } = props;

	return(
		<div className="email-wrapper">
			<div className="email-input-container">
				<TextField
					type="text"
					label="Email address (Optional)"
					fullWidth={true}
					value={selectedOptions[EMAIL] || ""}
					variant="outlined"
					onChange={e => {selectOptions(EMAIL, e.target.value)}}
				>
				</TextField>
			</div>
			<CustomToolTip title={EMAIL_HELP} placement="top-start" arrow>
				<HelpOutlineOutlinedIcon />
			</CustomToolTip>
		</div>
	)
}

const mapStateToProps = state => ({
	selectedOptions: state.option.selectedOptions,
})

const mapDispatchToProps = { 
	selectOptions,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailMain)