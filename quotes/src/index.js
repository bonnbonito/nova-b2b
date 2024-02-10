import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import CustomProject from './scripts/CustomProject';
import QuoteView from './scripts/QuoteView';
import LaserCutAcrylic from './scripts/products/acrylic/LaserCutAcrylic/LaserCutAcrylic';
import MetalLaminate from './scripts/products/acrylic/MetalLaminate/MetalLaminate';
import UvPrintedAcrylic from './scripts/products/acrylic/UvPrintedAcrylic/UvPrintedAcrylic';

if (document.querySelector('#laserCutAcrylic')) {
	ReactDOM.render(
		<LaserCutAcrylic />,
		document.querySelector('#laserCutAcrylic')
	);
}

if (document.querySelector('#uvPrintedAcrylic')) {
	ReactDOM.render(
		<UvPrintedAcrylic />,
		document.querySelector('#uvPrintedAcrylic')
	);
}

if (document.querySelector('#metalLaminateAcrylic')) {
	ReactDOM.render(
		<MetalLaminate />,
		document.querySelector('#metalLaminateAcrylic')
	);
}

if (document.querySelector('#quoteView')) {
	ReactDOM.render(<QuoteView />, document.querySelector('#quoteView'));
}

if (document.querySelector('#customProject')) {
	ReactDOM.render(<CustomProject />, document.querySelector('#customProject'));
}
