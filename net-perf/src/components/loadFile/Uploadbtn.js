import React, { useState, useEffect, useRef } from 'react';

const Uploadbtn = props => {
	const [filenames, setFilenames] = useState('');
	// props

	const chooseFile = e => {
		let file = e.target.files[0];
		// var file = inputRef.current.file[0];
		setFilenames(file.name);
	};

	return (
		<>
			<div className="upload_div">
				<label className="uploadButton" for="filebtn">
					Select File
				</label>
				<input
					type="file"
					className="input-file"
					id="filebtn"
					style={{ display: 'none' }}
					onChange={chooseFile}
				/>
				<p id="file_json">{filenames}</p>
			</div>
		</>
	);
};

export default Uploadbtn;
