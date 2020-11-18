import React from 'react';

import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import './TourStyle.css'

const steps = [
	{
		content: <h2>Welcome to AXIOME3!</h2>,
		placement: 'center',
		target: '.joyride-start'
	},
	{
		content: <h2>Here, you will be uploading input files.</h2>,
		placement: 'right',
		target: '.upload-outer'
	},
	{
		content: <h2>You can upload files from your computer.</h2>,
		placement: 'right',
		target: '.upload-inner-left'
	},
	{
		content: <h2>Alternatively, you can directly choose files from the server.</h2>,
		placement: 'right',
		target: '.browse-more'
	},
	{
		content: <h2>You can configure options here.</h2>,
		placement: 'right',
		target: '.option-container'
	},
	{
		content: <h2>You can see detailed explanation of each option here.</h2>,
		placement: 'right',
		target: '.option-modal-container'
	},
	{
		content: <h2>You may enter email address to receive email notification upon task queue and completion.</h2>,
		placement: 'right',
		target: '.email-input-container'
	},
	{
		content: <h2>After uploading inputs and configuring options, start analysis!</h2>,
		placement: 'right',
		target: '.submit-analysis-button'
	},
	{
		content: <h2>Each analysis will have a unique session ID. You may want to save the session ID in case you accidentally lose connection.</h2>,
		placement: 'right',
		target: '.session-id-display-container'
	},
	{
		content: <h2>Enter session ID, and click "LOAD SESSION" to load corresponding session.</h2>,
		placement: 'top',
		target: '.session-retrieve-input-container'
	},
]

class TourMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			run: false,
		}

		this.handleJoyrideClickStart = this.handleJoyrideClickStart.bind(this)
		this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this)
	}

	handleJoyrideCallback(data) {
		const { status, type } = data;
		const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

		if (finishedStatuses.includes(status)) {
			this.setState({run: false});
		}
	};

	handleJoyrideClickStart(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();

		this.setState({run: true});
	};

	render() {
		const { run } = this.state;

		return(
			<div className="tour-start-container">
				<Joyride
					callback={this.handleJoyrideCallback}
					continuous={true}
					run={run}
					scrollToFirstStep={true}
					showProgress={true}
					showSkipButton={true}
					steps={steps}
					styles={{
						options: {
							zIndex: 10000,
						},
					}}
				/>
				<span
					onClick={this.handleJoyrideClickStart}
					className="joyride-start clickable"
				>
					First time using AXIOME3?
				</span>
			</div>
		)
	}
}

export default TourMain