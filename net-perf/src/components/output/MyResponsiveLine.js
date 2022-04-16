import { ResponsiveLine } from '@nivo/line';
import mydata from './Mydata';
import before_data from '../../data/iperf3_b4.json';
import after_data from '../../data/iperf3.json';

import React, { useState, useEffect } from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = props => {
	const [chartData, setChartData] = useState([
		{
			bytes: [
				{
					id: '2022-03-26',
					color: 'hsl(33, 70%, 50%)',
					data: before_data.intervals.map((item, idx) => {
						return { x: after_data.intervals[idx].streams[0].end, y: item.streams[0].bytes };
						// { x: String(item.streams[0].end), y: item.streams[0].bytes + 5555300 }
					}),
				},
				{
					id: '2022-03-25',
					color: 'hsl(45, 70%, 50%)',
					data: after_data.intervals.map((item, idx) => {
						return { x: item.streams[0].end, y: item.streams[0].bytes };
					}),
				},
			],
			bits_per_second: [
				{
					id: '2022-03-26',
					color: 'hsl(33, 70%, 50%)',
					data: before_data.intervals.map((item, idx) => {
						return {
							x: after_data.intervals[idx].streams[0].end,
							y: item.streams[0].bits_per_second,
						};
					}),
				},
				{
					id: '2022-03-29',
					color: 'hsl(45, 70%, 50%)',
					data: after_data.intervals.map((item, idx) => {
						return { x: item.streams[0].end, y: item.streams[0].bits_per_second };
					}),
				},
			],
		},
	]);

	useEffect(() => {
		console.log('chartData = >:::', chartData);
		console.log('mydata = >:::', mydata);
	}, [chartData]);

	return (
		<ResponsiveLine
			data={props.checked ? chartData[0].bits_per_second : chartData[0].bytes}
			margin={{ top: 10, right: 10, bottom: 55, left: 80 }}
			xScale={{ type: 'point' }}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
				stacked: false,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="cardinal"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 5,
				tickPadding: -5,
				tickRotation: -60,
				legend: 'seconds',
				legendOffset: 45,
				legendPosition: 'middle',
			}}
			axisLeft={{
				orient: 'left',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: props.checked ? 'Mbits/sec' : 'MBytes',
				legendOffset: -65,
				legendPosition: 'middle',
			}}
			enableGridX={false}
			enableGridY={false}
			colors={{ scheme: 'set2' }}
			pointSize={5}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			enableArea={true}
			areaBlendMode="multiply"
			areaOpacity={0.5}
			useMesh={true}
			// legends={[
			// 	{
			// 		anchor: 'bottom-right',
			// 		direction: 'column',
			// 		justify: false,
			// 		translateX: 100,
			// 		translateY: 0,
			// 		itemsSpacing: 0,
			// 		itemDirection: 'left-to-right',
			// 		itemWidth: 80,
			// 		itemHeight: 20,
			// 		itemOpacity: 0.75,
			// 		symbolSize: 12,
			// 		symbolShape: 'circle',
			// 		symbolBorderColor: 'rgba(0, 0, 0, .5)',
			// 		effects: [
			// 			{
			// 				on: 'hover',
			// 				style: {
			// 					itemBackground: 'rgba(0, 0, 0, .03)',
			// 					itemOpacity: 1,
			// 				},
			// 			},
			// 		],
			// 	},
			// ]}
		/>
	);
};
export default MyResponsiveLine;
