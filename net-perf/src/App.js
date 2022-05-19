import LoadFile from './components/loadFile/LoadFile';
import Output from './components/output/Output';
import Theme from './components/theme/Theme';
import React, { useState, useEffect } from 'react';

function App() {
	const [onRunning, setOnRunning] = useState(false);
	const [Files, setFiles] = useState({ 0: false, 1: false, 2: false });

	useEffect(() => {
		console.log('files:', Files);
	}, [Files]);

	return (
		<>
			<Theme></Theme>
			{onRunning === false ? (
				<LoadFile setOnRunning={setOnRunning} setFiles={setFiles}></LoadFile>
			) : (
				<Output Files={Files}></Output>
			)}
		</>
	);
}

export default App;
