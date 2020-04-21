import React from 'react';
import { withRouter } from "react-router-dom";

import ReportMain from './Components/Report/ReportMain'

function Report() {
	return(
		<div className="report-main-container">
			<ReportMain />
		</div>
	)
}

export default withRouter(Report);