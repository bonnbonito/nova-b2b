import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import CustomProject from './scripts/CustomProject';
import MetalCutAccrylic from './scripts/MetaCutAccrylic';
import QuoteView from './scripts/QuoteView';

if (document.querySelector('#metalCutAccrylic')) {
	ReactDOM.render(
		<MetalCutAccrylic />,
		document.querySelector('#metalCutAccrylic')
	);
}

if (document.querySelector('#quoteView')) {
	ReactDOM.render(<QuoteView />, document.querySelector('#quoteView'));
}

if (document.querySelector('#customProject')) {
	ReactDOM.render(<CustomProject />, document.querySelector('#customProject'));
}
