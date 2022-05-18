import React, { useState, useEffect, useRef } from 'react';
import Uploadbtn from './Uploadbtn';

const LoadFile = props => {
	const [filenames, setFilenames] = useState({ 0: '', 1: '', 2: '' });

	const onExecuteClick = e => {
		props.setOnRunning(true);
	};

	const chooseFile = e => {
               let index = parseInt(e.target.id);
               setFilenames(prevState => ({
					...prevState,
					index : e.target.files[index].name,
				}));
	};

	return (
		<>
			<div id="LoadFile_container">
				<div id="upload_container">
					<Uploadbtn seq={'0'} filenames={filenames[0]} chooseFile={chooseFile}></Uploadbtn>
					<Uploadbtn seq={'1'} filenames={filenames[1]} chooseFile={chooseFile}></Uploadbtn>
					<Uploadbtn seq={'2'} filenames={filenames[2]} chooseFile={chooseFile}></Uploadbtn>
				</div>
				<div id="execute" onClick={onExecuteClick}>
					<div>Performance Test</div>
				</div>
			</div>
		</>
	);
};

export default LoadFile;
