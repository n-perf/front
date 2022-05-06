import React, { useState } from 'react';

const Theme = props => {
	const [isActive, setActive] = useState('false');

	const toggle = () => {
		setActive(!isActive);
		document.body.classList.toggle('root_body_light');
	};

	return (
		<div className="themeBtn">
			<button className={isActive ? 'light' : 'dark'} onClick={toggle}>
				Theme
			</button>
		</div>
	);
};

export default Theme;
