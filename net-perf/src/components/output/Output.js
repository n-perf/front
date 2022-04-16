import React, { useState, useEffect } from 'react';
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
				<FtraceList></FtraceList>
				<div id="graph_container">
					<div id="check_container">
						bits per second
						<input type="checkbox" onChange={onChecked} />
					</div>
					<MyResponsiveLine checked={checked}></MyResponsiveLine>
				</div>
			</div>
		</>
	);
};

export default Output;
