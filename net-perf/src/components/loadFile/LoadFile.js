import React, { useState, useEffect, useRef } from 'react';
import Uploadbtn from './Uploadbtn';

const LoadFile = props => {
	const onExecuteClick = e => {
		props.setOnRunning(true);
	};

	return (
		<>
			<div id="LoadFile_container">
				<div id="upload_container">
					<Uploadbtn></Uploadbtn>
					<Uploadbtn></Uploadbtn>
					<Uploadbtn></Uploadbtn>
				</div>
				<div id="execute" onClick={onExecuteClick}>
					<div>Performance Test</div>
				</div>
			</div>
		</>
	);
};

export default LoadFile;
