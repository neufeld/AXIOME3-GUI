import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Modal from '@material-ui/core/Modal';

import { SessionIdCopyModalBody } from '../Modal/ModalBodies';

function SessionIdDisplay(props) {
	const { sessionID } = props;

	const sessionIdRef = useRef(null);

	// Modal related
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalClose = () => {
		setModalOpen(false)
	}

	const copyOnClick = (e) => {
		window.getSelection().removeAllRanges();
		var range = document.createRange();
		range.selectNode(sessionIdRef.current)
		window.getSelection().addRange(range);
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
		setModalOpen(true);
	}

	return(
		<div
			className="session-id-display-container"
		>
			<p className="worker-status-header">Session ID:</p>
			<p className="worker-status" ref={sessionIdRef}>{sessionID}</p>
			{
				sessionID && 
				<FileCopyOutlinedIcon
					className="clickable"
					onClick={copyOnClick}
				/>
			}
			<Modal
				open={modalOpen}
				onClose={handleModalClose}
			>
				<SessionIdCopyModalBody/>
			</Modal>
		</div>
	)
}

const mapStateToProps  = state => ({
	sessionID: state.submit.uid
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionIdDisplay)