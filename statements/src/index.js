import React from 'react';
import ReactDOM from 'react-dom/client';
import Orders from './components/Orders';
import PendingOrders from './components/PendingOrders';
import './index.scss';

if (document.querySelector('#orderTable')) {
	const root = ReactDOM.createRoot(document.querySelector('#orderTable'));
	root.render(<Orders />);
}

if (document.querySelector('#orderPendingTable')) {
	const root = ReactDOM.createRoot(
		document.querySelector('#orderPendingTable')
	);
	root.render(<PendingOrders />);
}
