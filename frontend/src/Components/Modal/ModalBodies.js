import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ColourBrewMain from '../ColourBrew/ColourBrewMain'
import InputUploadRecommendation from '../Report/InputUpload/InputUploadRecommendation'

import INPUT_FORMAT_V1 from '../../Resources/inputformat_v1.png'
import INPUT_FORMAT_V2 from '../../Resources/inputformat_v2.png'
import INPUT_FORMAT_V1_MULTIPLE from '../../Resources/manifest_v1_multiple.png'
import INPUT_FORMAT_V2_MULTIPLE from '../../Resources/manifest_v2_multiple.png'
import DENOISE_EXAMPLE from '../../Resources/denoise_example.png'
import SAMPLE_METADATA from '../../Resources/sample_metadata.png'
import SAMPLE_ENV_METADATA from '../../Resources/sample_env_metadata.png'

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
		minwidth: 800,
		maxHeight: 800,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		overflow: 'scroll',
	},
	popup: {
		position: 'absolute',
		width: 400,
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
		<div className="modal-body-main-container">
			<h2>Paired End Fastq Manifest Format with multiple run IDs</h2>
			<img src={INPUT_FORMAT_V1_MULTIPLE}/>
		</div>
		<div className="modal-body-main-container">
			<h2>Paired End Fastq Manifest Format V2 with multiple run IDs</h2>
			<img src={INPUT_FORMAT_V2_MULTIPLE}/>
		</div>
		<div className="modal-body-additional-container">
			<p className="modal-body-additional-text">* Delimiter can be either comma (,) or tab (\t)</p>
			<p className="modal-body-additional-text">* Column headers MUST be identical to the corresponding examples</p>
			<p className="modal-body-additional-text">* Multiple run option is useful if you wish to denoise samples belonging to the same run_ID, 
				and later combine the individual ASV tables into one merged table.</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const InputUploadRecommendationModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<InputUploadRecommendation />
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

export const SessionIdCopyModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().popup} {...props} ref={ref}>
		<p className="modal-popup-text">Session ID copied to clipboard!</p>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))

export const MetadataModalBody = React.forwardRef((props, ref) => (
	<div style={getModalStyle()} className={useStyles().paper} {...props} ref={ref}>
		<div className="modal-body-main-container">
			<h2>What is a metadata file?</h2>
			<p>You may specify additional details about samples in the metadata file.</p>
		</div>	
		<div className="modal-body-main-container">
			<h2>Example metadata</h2>
			<img src={SAMPLE_METADATA}/>
		</div>
		<div className="modal-body-main-container">
			<h2>Example environmental metadata</h2>
			<img src={SAMPLE_ENV_METADATA}/>
		</div>
		<div className="modal-body-additional-container">
			<p className="modal-body-additional-text">* Column headers MUST NOT contain slash characters ('/', '\')</p>
			<p className="modal-body-additional-text">* Any QIIME2 compatible metadata files can be used</p>
			<p className="modal-body-additional-text">* Should be tab ('\t') delimited. </p>
			<p className="modal-body-additional-text">* Metadata column data types can be either numerical or categorical.</p>
			<p className="modal-body-additional-text">* Environmental metadata column data types can only be numerical.</p>
		</div>
		<div className="modal-body-exit-container">
			<span className="modal-body-exit-text">Press Esc to return</span>
		</div>
	</div>
))