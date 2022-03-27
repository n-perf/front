import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/sass/main.css';

ReactDOM.render(
	<React.StrictMode>
		<div id="logo">🌐 net-perf</div>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);
