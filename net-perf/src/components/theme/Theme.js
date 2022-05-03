import React, { useState } from 'react';

const Theme = props => {
	const [isActive, setActive] = useState('false');

	const handleToggle = () => {
		setActive(!isActive);
	};

	return (
		<div className={isActive ? 'light' : 'dark'}>
			<button onClick={handleToggle}>change mode</button>
		</div>
	);
};

export default Theme;
