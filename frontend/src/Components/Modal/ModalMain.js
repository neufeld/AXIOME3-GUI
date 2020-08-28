import React from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';

import { handleModalClose } from '../../redux/actions/modalAction';

function ModalMain(props) {	
	// Redux state
	const { modalOpen } = props;

	// Redux action
	const { handleModalClose } = props;

	// Props passed from parents
	const { body, optionLabel } = props;

	return(
		<div>
			<Modal
				open={modalOpen[optionLabel]}
				onClose={handleModalClose}
			>
				{body}
			</Modal>
		</div>
	)
}

const mapStateToProps  = state => ({
	modalOpen: state.modal.modalOpen,
})

const mapDispatchToProps = {
	handleModalClose,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMain)