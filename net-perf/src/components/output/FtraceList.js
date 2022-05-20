import React, { useState, useEffect } from 'react';

const FtraceList = props => {
	const [FtraceData, setFtraceData] = useState([]);
	const [N_Scroll, setN_Scroll] = useState(1);

	const onScroll = e => {
		const scrollHeight = e.target.scrollHeight;
		const scrollTop = e.target.scrollTop;
		const clientHeight = e.target.clientHeight;
		if (scrollTop + clientHeight >= scrollHeight * 0.9) {
			setN_Scroll(N_Scroll + 1);
		}
	};

	useEffect(() => {
		if (
			props.Files[0] &&
			props.Files[0].name.substr(props.Files[0].name.length - 4, 4) === '.txt'
		) {
			console.log('파일:', props.Files[0]);
			let fileReader = new FileReader();
			fileReader.onload = () => {
				setFtraceData(
					fileReader.result
						.split('\n')
						.slice(5)
						.map((item, idx) => {
							var splitedItem = item.slice(5).split(/[\|]/);
							if (item.slice(5).split(/[\|]/).length == 1) {
								return {
									Timestamp: '----',
									CPU: item.slice(0, 4),
									Delta: '',
									Functions: splitedItem[0],
								};
							} else {
								return {
									Timestamp: '----',
									CPU: item.slice(0, 4),
									Delta: splitedItem[0],
									Functions: splitedItem[1],
								};
							}
						}),
				);
			};
			fileReader.readAsText(props.Files[0]);
		}
	}, []);

	useEffect(() => {
		console.log('FtraceData입니다 : ', FtraceData);
	}, [FtraceData]);

	const renderFtrace = items => {
		return items.map((item, index) => {
			if (index < N_Scroll * 50) {
				const positive = item.rate > 0 ? true : false;
				return (
					<div className="FtraceList_item">
						<div className="Timestamp">{FtraceData[index].Timestamp}</div>
						<div className="CPU">{FtraceData[index].CPU}</div>
						<div className="Delta">{FtraceData[index].Delta}</div>
						<div className="Functions" style={{ whiteSpace: 'pre' }}>
							{FtraceData[index].Functions}
						</div>
					</div>
				);
			}
		});
	};

	return (
		<>
			<div id="FtraceList_container">
				<div id="FtraceList_head">
					<div className="Timestamp">Timestamp</div>
					<div className="CPU">CPU</div>
					<div className="Delta">Delta</div>
					<div className="Functions">Functions</div>
				</div>
				<div id="items_container" onScroll={onScroll}>
					{renderFtrace(FtraceData)}
				</div>
			</div>
		</>
	);
};

export default FtraceList;
