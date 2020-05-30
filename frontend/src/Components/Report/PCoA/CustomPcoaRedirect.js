import React from 'react';
import { openInNewTab } from '../../../utils/utils';

import GeneralHeader from '../GeneralHeader';

import {
	PCOA_ROUTE,
} from '../../../RouteConfig';

const CustomPcoaHeaderStyle = {
	marginBottom: '10px',
	fontWeight: 'bold',
	fontSize: '20px',
	fontVariant: 'small-caps',
}

// Parent component: PcoaPlots.js
function CustomPcoaRedirect() {
	return(
		<div>
			<GeneralHeader
				header={"Custom PCoA Plot"}
				style={CustomPcoaHeaderStyle}
			/>
			<span
				className="clickable"
				style={{marginLeft: '20px'}}
				onClick={() => {openInNewTab('#'+PCOA_ROUTE)}}
			>
			Click here to customize PCoA plot
			</span>
		</div>
	)
}

export default CustomPcoaRedirect