import React, { useState } from 'react';

const Theme = props => {
	const [isActive, setActive] = useState('false');

	const toggle = () => {
		setActive(!isActive);
	};

	return (
		<button className={isActive ? 'light' : 'dark'} onClick={toggle}>
			modeChange
		</button>
	);
};

export default Theme;
