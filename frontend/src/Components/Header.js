import React from 'react';

import AXIOME3_LOGO_MAIN from '../Resources/Logo1.png';

function Header() {
	return (
		<header>
			<div className="site-header">
				<img src={AXIOME3_LOGO_MAIN} width="60%" height="200"/>
			</div>
		</header>
	)
}

export default Header