import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

function CirculatFeedback() {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<CircularProgress />
		</div>
	)
}

export default CirculatFeedback