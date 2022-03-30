import React, { useState, useEffect } from 'react';
import MyResponsiveLine from './MyResponsiveLine';
import FtraceList from './FtraceList';
const Output = props => {
	return (
		<>
			<div id="Output_container">
				<FtraceList></FtraceList>
				<div id="graph_container">
					<MyResponsiveLine></MyResponsiveLine>
				</div>
			</div>
		</>
	);
};

export default Output;
