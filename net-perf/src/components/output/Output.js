import React, { useState } from 'react';
import MyResponsiveLine from './MyResponsiveLine';
import FtraceList from './FtraceList';
const Output = props => {
	const [checked, setChecked] = useState(false);
	const onChecked = e => {
		checked ? setChecked(false) : setChecked(true);
	};

	return (
		<>
			<div id="Output_container">
				<FtraceList Files={props.Files}></FtraceList>
				<div id="graph_container">
					<div id="check_container" style={{ color: '#0d1117' }}>
						bits per second
						<input type="checkbox" onChange={onChecked} />
					</div>
					<MyResponsiveLine checked={checked} Files={props.Files}></MyResponsiveLine>
				</div>
			</div>
		</>
	);
};

export default Output;
