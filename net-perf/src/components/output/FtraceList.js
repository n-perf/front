import React, { useState, useEffect } from 'react';
import MyResponsiveLine from './MyResponsiveLine';

const FtraceList = props => {
	return (
		<>
			<div id="FtraceList_container">
				<div id="FtraceList_head">
					<div className="Timestamp">Timestamp</div>
					<div className="CPU">CPU</div>
					<div className="Delta">Delta</div>
					<div className="Functions">Functions</div>
				</div>
				<div className="FtraceList_item">
					<div className="Timestamp">487317778104</div>
					<div className="CPU">0</div>
					<div className="Delta">0.723 us</div>
					<div className="Functions">main function</div>
				</div>
			</div>
		</>
	);
};

export default FtraceList;
