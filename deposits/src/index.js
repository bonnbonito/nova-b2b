import React from 'react';
import ReactDOM from 'react-dom/client';
import Deposits from './Deposits';

if (document.querySelector('#depositTable')) {
	const root = ReactDOM.createRoot(document.querySelector('#depositTable'));
	root.render(<Deposits />);
}
