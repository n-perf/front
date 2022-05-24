import { ResponsiveLine } from '@nivo/line';
import React, { useState, useEffect } from 'react';

const MyResponsiveLine = props => {
	const [FileLoaded, setFileLoaded] = useState({ before: false, after: false });

	useEffect(() => {
		if (
			props.Files[1] &&
			props.Files[3] &&
			props.Files[1].name.substr(props.Files[1].name.length - 5, 5) === '.json' &&
			props.Files[3].name.substr(props.Files[3].name.length - 5, 5) === '.json'
		) {
			var fileReader_1 = new FileReader();
			fileReader_1.onload = function (e) {
				var json = JSON.parse(e.target.result);
				setFileLoaded(prevState => ({
					...prevState,
					before: json,
				}));
			};
			fileReader_1.readAsText(props.Files[1]);

			var fileReader_2 = new FileReader();
			fileReader_2.onload = function (e) {
				var json = JSON.parse(e.target.result);
				setFileLoaded(prevState => ({
					...prevState,
					after: json,
				}));
			};
			fileReader_2.readAsText(props.Files[3]);
		}
	}, []);

	useEffect(() => {
		if (FileLoaded.before && FileLoaded.after) {
			setChartData([
				{
					bytes: [
						{
							id: 'before',
							color: 'hsl(33, 70%, 50%)',
							data: FileLoaded.before.intervals.map((item, idx) => {
								return {
									x: FileLoaded.after.intervals[idx].streams[0].end.toFixed(2),
									y: item.streams[0].bytes,
								};
							}),
						},
						{
							id: 'after',
							color: 'hsl(45, 70%, 50%)',
							data: FileLoaded.after.intervals.map((item, idx) => {
								return { x: item.streams[0].end.toFixed(2), y: item.streams[0].bytes };
							}),
						},
					],
					bits_per_second: [
						{
							id: 'before',
							color: 'hsl(33, 70%, 50%)',
							data: FileLoaded.before.intervals.map((item, idx) => {
								return {
									x: FileLoaded.after.intervals[idx].streams[0].end.toFixed(2),
									y: item.streams[0].bits_per_second,
								};
							}),
						},
						{
							id: 'after',
							color: 'hsl(45, 70%, 50%)',
							data: FileLoaded.after.intervals.map((item, idx) => {
								return { x: item.streams[0].end.toFixed(2), y: item.streams[0].bits_per_second };
							}),
						},
					],
				},
			]);
		}
	}, [FileLoaded]);

	const [chartData, setChartData] = useState(false);

	const renderChart = e => {
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
					tickPadding: 20,
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
				colors={{ scheme: 'category10' }}
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
				//  {
				//      anchor: 'bottom-right',
				//      direction: 'column',
				//      justify: false,
				//      translateX: 100,
				//      translateY: 0,
				//      itemsSpacing: 0,
				//      itemDirection: 'left-to-right',
				//      itemWidth: 80,
				//      itemHeight: 20,
				//      itemOpacity: 0.75,
				//      symbolSize: 12,
				//      symbolShape: 'circle',
				//      symbolBorderColor: 'rgba(0, 0, 0, .5)',
				//      effects: [
				//          {
				//              on: 'hover',
				//              style: {
				//                  itemBackground: 'rgba(0, 0, 0, .03)',
				//                  itemOpacity: 1,
				//              },
				//          },
				//      ],
				//  },
				// ]}
			/>
		);
	};

	return chartData
		? renderChart()
		: 'The file format is invalid. \n Please upload the file in Json format';
};
export default MyResponsiveLine;
