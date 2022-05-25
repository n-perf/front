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

	const returnID = () => {
		if (props.seq == '0') {
			return 'upload_btn1';
		} else if (props.seq == '1') {
			return 'upload_btn2';
		} else if (props.seq == '2') {
			return 'upload_btn3';
		} else if (props.seq == '3') {
			return 'upload_btn4';
		}
	};

	return (
		<>
			<div className="upload_div" id={returnID()}>
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
