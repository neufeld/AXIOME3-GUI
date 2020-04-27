import React from 'react';

function GeneralHeader(props) {
	const { header, style } = props;

	return(
		<p style={style}>{header}</p>
	)
}

export default GeneralHeader