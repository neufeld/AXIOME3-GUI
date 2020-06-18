import React from 'react';

import './HeaderStyle.css';
import AXIOME3_LOGO_MAIN from '../../../Resources/Logo1.png';

function HeaderMain() {
	return(
		<div className="report-title-container">
			<img src={AXIOME3_LOGO_MAIN} width="60%" height="200"/>
			<p className="report-title">Summary Report</p>
		</div>
	)
}

export default HeaderMain