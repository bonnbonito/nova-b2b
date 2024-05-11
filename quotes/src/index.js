import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tooltip/dist/react-tooltip.css';

import './index.css';
import { AppProvider } from './scripts/AppProvider';
import QuoteView from './scripts/QuoteView';
import LaserCutAcrylic from './scripts/products/acrylic/LaserCutAcrylic/LaserCutAcrylic';
import LayeredAcrylic from './scripts/products/acrylic/LayeredAcrylic/LayeredAcrylic';
import MetalLaminate from './scripts/products/acrylic/MetalLaminate/MetalLaminate';
import UvPrintedAcrylic from './scripts/products/acrylic/UvPrintedAcrylic/UvPrintedAcrylic';
import CombineQuotes from './scripts/products/combine/CombineQuotes';
import CustomProject from './scripts/products/custom/CustomProject';
import TrimLessBackLit from './scripts/products/metal-channel/TrimLessBackLit/TrimLessBackLit';
import TrimLessFrontAndBackLit from './scripts/products/metal-channel/TrimLessFrontAndBackLit/TrimLessFrontAndBackLit';
import TrimLessFrontLit from './scripts/products/metal-channel/TrimLessFrontLit/TrimLessFrontLit';
import FabricatedStainless from './scripts/products/metal/FabricatedStainless/FabricatedStainless';
import LaserCutAluminum from './scripts/products/metal/LaserCutAluminum/LaserCutAluminum';
import LaserCutStainless from './scripts/products/metal/LaserCutStainless/LaserCutStainless';
import PVCMetalLaminate from './scripts/products/pvc/PVCMetalLaminate/PVCMetalLaminate';
import PVCPainted from './scripts/products/pvc/PVCPainted/PVCPainted';
import PVCUv from './scripts/products/pvc/PVCUv/PVCUv';

if (document.getElementById('QuoteApp')) {
	ReactDOM.render(<QuoteApp />, document.querySelector('#QuoteApp'));
}

function QuoteApp() {
	let component;
	switch (NovaQuote.quote_div_id) {
		case 'combineQuotes':
			component = <CombineQuotes />;
			break;
		case 'laserCutAcrylic':
			component = <LaserCutAcrylic />;
			break;
		case 'quoteView':
			component = <QuoteView />;
			break;
		case 'pvcMetalLaminate':
			component = <PVCMetalLaminate />;
			break;
		case 'pvcPainted':
			component = <PVCPainted />;
			break;
		case 'pvcUv':
			component = <PVCUv />;
			break;
		case 'layeredAcrylic':
			component = <LayeredAcrylic />;
			break;
		case 'laserCutAluminum':
			component = <LaserCutAluminum />;
			break;
		case 'uvPrintedAcrylic':
			component = <UvPrintedAcrylic />;
			break;
		case 'metalLaminateAcrylic':
			component = <MetalLaminate />;
			break;
		case 'metalChannelTrimlessFrontLit':
			component = <TrimLessFrontLit />;
			break;
		case 'laserCutStainless':
			component = <LaserCutStainless />;
			break;
		case 'metalChannelTrimlessFrontAndBackLit':
			component = <TrimLessFrontAndBackLit />;
			break;
		case 'metalChannelTrimlessBackLit':
			component = <TrimLessBackLit />;
			break;
		case 'metalFabricatedStainless':
			component = <FabricatedStainless />;
			break;
		default:
			component = <CustomProject />;
			break;
	}
	return <AppProvider>{component}</AppProvider>;
}
