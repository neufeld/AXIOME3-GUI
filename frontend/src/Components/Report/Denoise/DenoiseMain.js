import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '../SectionHeader';
import GeneralHeader from '../GeneralHeader';
import DownloadButton from '../DownloadButton';

function DenoiseMain(props) {
	// Event handler from parent component
	const { handleClick } = props;

	// Redux states
	const { uid } = props;

	const inputField = [
		{name: 'uid', value: uid}
	];

	return(
		<section>
			<SectionHeader header={"Denoise"} />
			helo
		</section>
	)
}

const mapStateToProps  = state => ({
	uid: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(DenoiseMain)