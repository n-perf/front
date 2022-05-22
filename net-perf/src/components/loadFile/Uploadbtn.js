import React from 'react';
import ftrace_img from '../../images/ftrace.png';
import iperf3_img from '../../images/iperf3.png';

const Uploadbtn = props => {
	const renderText = () => {
		if (props.seq == '0') {
			return 'Load Trace File (Before)';
		} else if (props.seq == '1') {
			return 'Add iperf3 File (Before)';
		} else if (props.seq == '2') {
			return 'Load Trace File (After)';
		} else if (props.seq == '3') {
			return 'Add iperf3 File (After)';
		}
	};

	return (
		<>
			<div className="upload_div">
				<div className="upload_img">
					<img
						src={props.seq === '0' || props.seq === '1' ? ftrace_img : iperf3_img}
						alt="btnimg"
					/>
				</div>
				{renderText()}
				<label className="uploadButton" for={props.seq}>
					Select File
				</label>

				<input
					type="file"
					className="input-file"
					id={props.seq}
					style={{ display: 'none' }}
					onChange={props.chooseFile}
				/>

				<p id="file_json">{props.filenames}</p>
			</div>
		</>
	);
};

export default Uploadbtn;
