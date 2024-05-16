import React from 'react';
import ReactDOM from 'react-dom/client';
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
import AluminumResinFrontBackLit from './scripts/products/metal-channel/AluminumResinFrontBackLit/AluminumResinFrontBackLit';
import AluminumResinFrontLit from './scripts/products/metal-channel/AluminumResinFrontLit/AluminumResinFrontLit';
import TrimLessBackLit from './scripts/products/metal-channel/TrimLessBackLit/TrimLessBackLit';
import TrimLessFrontAndBackLit from './scripts/products/metal-channel/TrimLessFrontAndBackLit/TrimLessFrontAndBackLit';
import TrimLessFrontLit from './scripts/products/metal-channel/TrimLessFrontLit/TrimLessFrontLit';
import FabricatedStainless from './scripts/products/metal/FabricatedStainless/FabricatedStainless';
import LaserCutAluminum from './scripts/products/metal/LaserCutAluminum/LaserCutAluminum';
import LaserCutStainless from './scripts/products/metal/LaserCutStainless/LaserCutStainless';
import PVCMetalLaminate from './scripts/products/pvc/PVCMetalLaminate/PVCMetalLaminate';
import PVCPainted from './scripts/products/pvc/PVCPainted/PVCPainted';
import PVCUv from './scripts/products/pvc/PVCUv/PVCUv';

declare global {
	interface Window {
		NovaQuote: {
			quote_div_id: string;
		};
	}
}

const rootElement = document.getElementById('QuoteApp');
const quoteView = document.getElementById('quoteView');
const customProject = document.getElementById('customProject');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<QuoteApp />);
}

if (quoteView) {
	const root = ReactDOM.createRoot(quoteView);
	root.render(<QuoteView />);
}

if (customProject) {
	const root = ReactDOM.createRoot(customProject);
	root.render(<CustomTempProject />);
}

function CustomTempProject(): JSX.Element {
	return (
		<AppProvider>
			<CustomProject />
		</AppProvider>
	);
}

function QuoteApp(): JSX.Element {
	let component: JSX.Element;
	switch (window.NovaQuote.quote_div_id) {
		case 'combineQuotes':
			component = (
				<AppProvider>
					<CombineQuotes />
				</AppProvider>
			);
			break;
		case 'AluminumResinFrontBackLit':
			component = (
				<AppProvider>
					<AluminumResinFrontBackLit />
				</AppProvider>
			);
			break;
		case 'AluminumResinFrontLit':
			component = (
				<AppProvider>
					<AluminumResinFrontLit />
				</AppProvider>
			);
			break;
		case 'laserCutAcrylic':
			component = (
				<AppProvider>
					<LaserCutAcrylic />
				</AppProvider>
			);
			break;
		case 'pvcMetalLaminate':
			component = (
				<AppProvider>
					<PVCMetalLaminate />
				</AppProvider>
			);
			break;
		case 'pvcPainted':
			component = (
				<AppProvider>
					<PVCPainted />
				</AppProvider>
			);
			break;
		case 'pvcUv':
			component = (
				<AppProvider>
					<PVCUv />
				</AppProvider>
			);
			break;
		case 'layeredAcrylic':
			component = (
				<AppProvider>
					<LayeredAcrylic />
				</AppProvider>
			);
			break;
		case 'laserCutAluminum':
			component = (
				<AppProvider>
					<LaserCutAluminum />
				</AppProvider>
			);
			break;
		case 'uvPrintedAcrylic':
			component = (
				<AppProvider>
					<UvPrintedAcrylic />
				</AppProvider>
			);
			break;
		case 'metalLaminateAcrylic':
			component = (
				<AppProvider>
					<MetalLaminate />
				</AppProvider>
			);
			break;
		case 'metalChannelTrimlessFrontLit':
			component = (
				<AppProvider>
					<TrimLessFrontLit />
				</AppProvider>
			);
			break;
		case 'laserCutStainless':
			component = (
				<AppProvider>
					<LaserCutStainless />
				</AppProvider>
			);
			break;
		case 'metalChannelTrimlessFrontAndBackLit':
			component = (
				<AppProvider>
					<TrimLessFrontAndBackLit />
				</AppProvider>
			);
			break;
		case 'metalChannelTrimlessBackLit':
			component = (
				<AppProvider>
					<TrimLessBackLit />
				</AppProvider>
			);
			break;
		case 'metalFabricatedStainless':
			component = (
				<AppProvider>
					<FabricatedStainless />
				</AppProvider>
			);
			break;
		default:
			component = (
				<AppProvider>
					<CustomProject />
				</AppProvider>
			);
			break;
	}
	return component;
}
