import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import Acrylic from './scripts/Acrylic';

if (document.querySelector('#accrylicQuote')) {
	ReactDOM.render(<Acrylic />, document.querySelector('#accrylicQuote'));
}
