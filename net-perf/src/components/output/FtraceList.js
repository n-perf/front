import React, { useState, useEffect } from 'react';
import { diff, prepareDiff } from './differ';

const FtraceList = props => {
	const [FtraceData, setFtraceData] = useState({ before: false, after: false });
	const [TracingResult, setTracingResult] = useState(false);
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
			props.Files[0].name.substr(props.Files[0].name.length - 4, 4) === '.txt' &&
			props.Files[2] &&
			props.Files[2].name.substr(props.Files[2].name.length - 4, 4) === '.txt'
		) {
			let fileReader1 = new FileReader();
			fileReader1.onload = () => {
				setFtraceData(prevState => ({
					...prevState,
					before: fileReader1.result
						.split('\n')
						.slice(5)
						.map((item, index) => {
							if (item.split('|').length !== 1) {
								return item;
							} else {
								return 'us  |  ';
							}
						}),
				}));
			};
			fileReader1.readAsText(props.Files[0]);

			let fileReader2 = new FileReader();
			fileReader2.onload = () => {
				setFtraceData(prevState => ({
					...prevState,
					after: fileReader2.result
						.split('\n')
						.slice(5)
						.map((item, index) => {
							if (item.split('|').length !== 1) {
								return item;
							} else {
								return 'us  |  ';
							}
						}),
				}));
			};
			fileReader2.readAsText(props.Files[2]);
		}
	}, []);

	useEffect(() => {
		if (FtraceData.before !== false && FtraceData.after !== false) {
			setTracingResult(
				diff(
					prepareDiff(FtraceData.before),
					prepareDiff(FtraceData.after),
					FtraceData.before,
					FtraceData.after,
				),
			);
		}
	}, [FtraceData]);

	const renderFtrace = items => {
		return items.map((item, index) => {
			if (index < N_Scroll * 50) {
				return (
					<div
						className={
							TracingResult[index].action === 3
								? 'FtraceList_item'
								: TracingResult[index].action === 1
								? 'FtraceList_item_added'
								: 'FtraceList_item_deleted'
						}
					>
						<div className="Timestamp">
							{isNaN(TracingResult[index].time) ? '' : TracingResult[index].time}
						</div>
						<div className="CPU">{TracingResult[index].cpu}</div>
						<div className="Delta">
							{isNaN(TracingResult[index].diff) ? '' : TracingResult[index].diff.toFixed(3)}
						</div>
						<div className="Functions" style={{ whiteSpace: 'pre' }}>
							{TracingResult[index].data}
						</div>
					</div>
				);
			} else return '';
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
					{TracingResult ? renderFtrace(TracingResult) : ''}
				</div>
			</div>
		</>
	);
};

export default FtraceList;
