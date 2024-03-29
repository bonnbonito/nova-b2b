import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import QuoteView from './scripts/QuoteView';
import LaserCutAcrylic from './scripts/products/acrylic/LaserCutAcrylic/LaserCutAcrylic';
import LayeredAcrylic from './scripts/products/acrylic/LayeredAcrylic/LayeredAcrylic';
import MetalLaminate from './scripts/products/acrylic/MetalLaminate/MetalLaminate';
import UvPrintedAcrylic from './scripts/products/acrylic/UvPrintedAcrylic/UvPrintedAcrylic';
import CustomProject from './scripts/products/custom/CustomProject';
import TrimLessBackLit from './scripts/products/metal-channel/TrimLessBackLit/TrimLessBackLit';
import TrimLessFrontAndBackLit from './scripts/products/metal-channel/TrimLessFrontAndBackLit/TrimLessFrontAndBackLit';
import TrimLessFrontLit from './scripts/products/metal-channel/TrimLessFrontLit/TrimLessFrontLit';
import FabricatedStainless from './scripts/products/metal/FabricatedStainless/FabricatedStainless';
import LaserCutAluminum from './scripts/products/metal/LaserCutAluminum/LaserCutAluminum';
import LaserCutStainless from './scripts/products/metal/LaserCutStainless/LaserCutStainless';

if (document.querySelector('#laserCutAcrylic')) {
	ReactDOM.render(
		<LaserCutAcrylic />,
		document.querySelector('#laserCutAcrylic')
	);
}

if (document.querySelector('#layeredAcrylic')) {
	ReactDOM.render(
		<LayeredAcrylic />,
		document.querySelector('#layeredAcrylic')
	);
}

if (document.querySelector('#laserCutAluminum')) {
	ReactDOM.render(
		<LaserCutAluminum />,
		document.querySelector('#laserCutAluminum')
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

if (document.querySelector('#laserCutStainless')) {
	ReactDOM.render(
		<LaserCutStainless />,
		document.querySelector('#laserCutStainless')
	);
}

if (document.querySelector('#metalChannelTrimlessFrontLit')) {
	ReactDOM.render(
		<TrimLessFrontLit />,
		document.querySelector('#metalChannelTrimlessFrontLit')
	);
}

if (document.querySelector('#metalChannelTrimlessFrontAndBackLit')) {
	ReactDOM.render(
		<TrimLessFrontAndBackLit />,
		document.querySelector('#metalChannelTrimlessFrontAndBackLit')
	);
}

if (document.querySelector('#metalChannelTrimlessBackLit')) {
	ReactDOM.render(
		<TrimLessBackLit />,
		document.querySelector('#metalChannelTrimlessBackLit')
	);
}

if (document.querySelector('#metalFabricatedStainless')) {
	ReactDOM.render(
		<FabricatedStainless />,
		document.querySelector('#metalFabricatedStainless')
	);
}

if (document.querySelector('#quoteView')) {
	ReactDOM.render(<QuoteView />, document.querySelector('#quoteView'));
}

if (document.querySelector('#customProject')) {
	ReactDOM.render(<CustomProject />, document.querySelector('#customProject'));
}
