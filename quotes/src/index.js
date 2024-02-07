import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import CustomProject from './scripts/CustomProject';
import LaserCutAcrylic from './scripts/LaserCutAcrylic';
import QuoteView from './scripts/QuoteView';

if (document.querySelector('#laserCutAcrylic')) {
	ReactDOM.render(
		<LaserCutAcrylic />,
		document.querySelector('#laserCutAcrylic')
	);
}

if (document.querySelector('#quoteView')) {
	ReactDOM.render(<QuoteView />, document.querySelector('#quoteView'));
}

if (document.querySelector('#customProject')) {
	ReactDOM.render(<CustomProject />, document.querySelector('#customProject'));
}
