import React, { useState, useEffect, useRef } from 'react';

const LoadFile = props => {
	const inputRef = useRef(null);

	const onExecuteClick = e => {
		props.setOnRunning(true);
	};

	const [filenames, setFilenames] = useState(['', '', '']);

	const chooseFile = e => {
		console.log(
			'hhhh제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!h1111111',
		);
		let file = e.target.files[0];
		// var file = inputRef.current.file[0];
		setFilenames([file.name, '', '']);
		console.log(
			'hhhh제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!제발 좀 되라!!h222222',
		);
	};

	return (
		<>
			{/* 밑에 파일 선택 3개 컴포넌트화 필요 */}
			<div id="LoadFile_container">
				<div id="upload_container">
					<div className="upload_div">
						<label className="uploadButton" for="file_1">
							Select File
						</label>
						<input
							type="file"
							className="input-file"
							id="file_1"
							style={{ display: 'none' }}
							onChange={chooseFile}
							ref={inputRef}
						/>
						<p id="file_json">{filenames[0]}</p>
					</div>
					<div className="upload_div">
						<label className="uploadButton" for="file_2">
							Select File
						</label>
						<input
							type="file"
							className="input-file"
							id="file_2"
							style={{ display: 'none' }}
							onChange={chooseFile}
						/>
					</div>
					<div className="upload_div">
						<label className="uploadButton" for="file_3">
							Select File
						</label>
						<input
							type="file"
							className="input-file"
							id="file_3"
							style={{ display: 'none' }}
							onChange={chooseFile}
						/>
					</div>
				</div>
				<div id="execute" onClick={onExecuteClick}>
					<div>Performance Test</div>
				</div>
			</div>
		</>
	);
};

export default LoadFile;
