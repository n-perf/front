import React, { useState, useEffect } from 'react';

const LoadFile = props => {
	const onExecuteClick = e => {
		props.setOnRunning(true);
	};

	return (
		<>
			{/* 밑에 파일 선택 3개 컴포넌트화 필요 */}
			<div id="LoadFile_container">
				<div id="upload_container">
					<div className="upload_div">
						<label className="uploadButton" for="input-file">
							Select File
						</label>
						<input type="file" id="input-file" style={{ display: 'none' }} />
					</div>
					<div className="upload_div">
						<label className="uploadButton" for="input-file">
							Select File
						</label>
						<input type="file" id="input-file" style={{ display: 'none' }} />{' '}
					</div>
					<div className="upload_div">
						<label className="uploadButton" for="input-file">
							Select File
						</label>
						<input type="file" id="input-file" style={{ display: 'none' }} />{' '}
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
