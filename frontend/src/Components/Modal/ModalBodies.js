import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ColourBrewMain from '../ColourBrew/ColourBrewMain'

import INPUT_FORMAT_V1 from '../../Resources/inputformat_v1.png'
import INPUT_FORMAT_V2 from '../../Resources/inputformat_v2.png'
import DENOISE_EXAMPLE from '../../Resources/denoise_example.png'

import {
	SAMPLE_TYPE_HELP,
	TRIM_LEFT_F_HELP,
	TRIM_LEFT_R_HELP,
	TRUNC_LEN_F_HELP,
	TRUNC_LEN_R_HELP,
	SAMPLING_DEPTH_HELP,
	PRIMARY_TARGET_HELP,
	SECONDARY_TARGET_HELP,
} from '../../misc/OptionHelpConfig'

import './ModalBodyStyle.css';

const getModalStyle = () => {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 800,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export const SampleTypeModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Sample Type</h2>
			<p>{SAMPLE_TYPE_HELP}</p>
		</div>
	</div>
))

export const InputFormatModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>What is a manifest file?</h2>
			<p>You should list absolute paths to FASTQ files along with sample IDs in the manifest file.</p>
		</div>	
		<div className="modal-body-main-container">
			<h2>Paired End Fastq Manifest Format</h2>
			<img src={INPUT_FORMAT_V1}/>
		</div>
		<div className="modal-body-main-container">
			<h2>Paired End Fastq Manifest Format V2</h2>
			<img src={INPUT_FORMAT_V2}/>
		</div>
		<div className="modal-body-additional-container">
			<p className="modal-body-additional-text">* Delimiter can be either comma (,) or tab (\t)</p>
			<p className="modal-body-additional-text">* Column headers MUST be identical to the corresponding examples</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const DenoiseModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Denoise parameters explained with hypothetical amplicon</h2>
			<img src={DENOISE_EXAMPLE} width='800'/>
		</div>
		<div className="modal-body-additional-container">
			<p className="modal-body-additional-text">* trim-left-f: {TRIM_LEFT_F_HELP} </p>
			<p className="modal-body-additional-text">* trim-left-r: {TRIM_LEFT_R_HELP} </p>
			<p className="modal-body-additional-text">* trunc-len-f: {TRUNC_LEN_F_HELP} </p>
			<p className="modal-body-additional-text">* trunc-len-r: {TRUNC_LEN_R_HELP} </p>
		</div>
		<div className="modal-body-main-container">
			<h2>Choosing the right values</h2>
			
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const SamplingDepthModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Sampling depth</h2>
			<p>{SAMPLING_DEPTH_HELP}</p>
		</div>
		<div className="modal-body-additional-container">
			<p>'auto': Set this value to be the lowest read count in the samples.</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const ColourBrewerModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<ColourBrewMain />
	</div>
))

export const PrimaryTargetModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Primary Target</h2>
			<p>{PRIMARY_TARGET_HELP}</p>
		</div>
		<div className="modal-body-additional-container">
			<p>* Colour will be chosen based on "Colour set" option.</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const SecondayTargetModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Secondary Target</h2>
			<p>{SECONDARY_TARGET_HELP}</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const CoresModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>Cores</h2>
			<p>Number of physical cores to use. Some steps will use more RAM with increased cores.</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const PlotSizeModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<ColourBrewMain />
	</div>
))