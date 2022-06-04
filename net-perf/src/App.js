import LoadFile from './components/loadFile/LoadFile';
import Output from './components/output/Output';
import Theme from './components/theme/Theme';
import React, { useState, useEffect } from 'react';
import 'shepherd.js/dist/css/shepherd.css';
import Guide from './components/theme/Guide';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import { steps as newSteps } from './components/theme/Steps';

function App() {
	const [onRunning, setOnRunning] = useState(false);
	const [Files, setFiles] = useState({ 0: false, 1: false, 2: false, 3: false });

	const tourOptions = {
		defaultStepOptions: {
			cancelIcon: {
				enabled: true,
			},
		},
		useModalOverlay: true,
	};

	useEffect(() => {
		console.log('files:', Files);
	}, [Files]);

	return (
		<>
			<div className="btnContainer">
				<ShepherdTour steps={newSteps} tourOptions={tourOptions}>
					<Guide />
				</ShepherdTour>
				<Theme></Theme>
			</div>

			{onRunning === false ? (
				<LoadFile setOnRunning={setOnRunning} setFiles={setFiles}></LoadFile>
			) : (
				<Output Files={Files}></Output>
			)}
		</>
	);
}

export default App;
