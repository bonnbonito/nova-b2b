import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import App from './scripts/App';

if (document.querySelector('#novaQuote')) {
	ReactDOM.render(<App />, document.querySelector('#novaQuote'));
}
