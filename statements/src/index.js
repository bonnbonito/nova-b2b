import React from 'react';
import ReactDOM from 'react-dom/client';
import Orders from './components/Orders';
import './index.scss';

if (document.querySelector('#orderTable')) {
	const root = ReactDOM.createRoot(document.querySelector('#orderTable'));
	root.render(<Orders />);
}
