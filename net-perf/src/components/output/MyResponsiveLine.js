import { ResponsiveLine } from '@nivo/line';
import mydata from './Mydata';
import tmp_data from '../../data/iperf3.json';
import React, { useState, useEffect } from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = props => {
	// console.log(
	// 	tmp_data.map((item, idx) => {
	// 		return item;
	// 	}),
	// );

	const [chartData, setChartData] = useState([
		{
			id: '2022-03-26',
			color: 'hsl(33, 70%, 50%)',
			data: tmp_data.intervals.map((item, idx) => {
				return { x: String(item.streams[0].end), y: item.streams[0].bytes };
			}),
		},
		,
	]);
	useEffect(() => {
		console.log('chartData = >:::', chartData);
		console.log('mydata = >:::', mydata);
	}, [chartData]);

	// const tmp = tmp_data.intervals.map((item, idx) => {
	// 	return item.streams[0].bytes;
	// });
	// console.log(Xdata);

	return (
		<ResponsiveLine
			data={chartData}
			margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
				stacked: true,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="cardinal"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -60,
				legend: 'seconds',
				legendOffset: 36,
				legendPosition: 'middle',
			}}
			axisLeft={{
				orient: 'left',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'MBits/s',
				legendOffset: -50,
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
