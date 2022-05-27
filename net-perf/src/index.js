import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/sass/main.css';

ReactDOM.render(
	<React.StrictMode>
		<div id="title_container">
			<div id="logo">
				🌐 net-perf
				<div id="desc">View result of network performance</div>
			</div>
		</div>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);
