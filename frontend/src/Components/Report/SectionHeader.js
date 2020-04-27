import React from 'react';

function SectionHeader(props) {
	const { header } = props;

	return(
		<p className="section-header">{header}</p>
	)
}

export default SectionHeader