import LoadFile from './components/loadFile/LoadFile';
import Output from './components/output/Output';
import React, { useState, useEffect } from 'react';

function App() {
	const [onRunning, setOnRunning] = useState(false);

	return (
		<>
			{onRunning == false ? <LoadFile setOnRunning={setOnRunning}></LoadFile> : <Output></Output>}
		</>
	);
}

export default App;
