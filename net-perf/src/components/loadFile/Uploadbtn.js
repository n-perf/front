import React, { useState, useEffect, useRef } from 'react';

const Uploadbtn = props => {
	// const [filenames, setFilenames] = useState('');
	// props

	// const chooseFile = e => {
	// 	let file = e.target.files[0];
	// 	// var file = inputRef.current.file[0];
	// 	setFilenames(file.name);
	// };

	return (
		<>
			<div className="upload_div">
				<label className="uploadButton" for={props.seq}>
					Select File
				</label>
				<input
					type="file"
					className="input-file"
					id={props.seq}
					style={{ display: 'none' }}
					onChange={props.chooseFile}
				/>
				<p id="file_json">{props.filenames}</p>
			</div>
		</>
	);
};

export default Uploadbtn;
