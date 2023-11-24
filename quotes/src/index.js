import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import NovaQuote from './scripts/NovaQuote';
import QuoteView from './scripts/QuoteView';

if (document.querySelector('#novaQuote')) {
	ReactDOM.render(<NovaQuote />, document.querySelector('#novaQuote'));
}

if (document.querySelector('#quoteView')) {
	ReactDOM.render(<QuoteView />, document.querySelector('#quoteView'));
}
