import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-tooltip/dist/react-tooltip.css';

import './index.css';
import { AppProvider } from './scripts/AppProvider';
import QuoteView from './scripts/QuoteView';
import AcrylicBackLit from './scripts/products/acrylic-channel/AcrylicBackLit/AcrylicBackLit';
import AcrylicFrontBackLit from './scripts/products/acrylic-channel/AcrylicFrontBackLit/AcrylicFrontBackLit';
import AcrylicFrontLit from './scripts/products/acrylic-channel/AcrylicFrontLit/AcrylicFrontLit';
import AcrylicFrontSideLit from './scripts/products/acrylic-channel/AcrylicFrontSideLit/AcrylicFrontSideLit';
import AcrylicSideLit from './scripts/products/acrylic-channel/AcrylicSideLit/AcrylicSideLit';
import LaserCutAcrylic from './scripts/products/acrylic/LaserCutAcrylic/LaserCutAcrylic';
import LayeredAcrylic from './scripts/products/acrylic/LayeredAcrylic/LayeredAcrylic';
import MetalLaminate from './scripts/products/acrylic/MetalLaminate/MetalLaminate';
import UvPrintedAcrylic from './scripts/products/acrylic/UvPrintedAcrylic/UvPrintedAcrylic';
import CombineQuotes from './scripts/products/combine/CombineQuotes';
import CustomProject from './scripts/products/custom/CustomProject';
import FlexNeonSign from './scripts/products/led-neon/FlexNeonSign/FlexNeonSign';
import RigidNeonSignNoBacking from './scripts/products/led-neon/RigidNeonSignNoBacking/RigidNeonSignNoBacking';
import RigidNeonSignWithBacking from './scripts/products/led-neon/RigidNeonSignWithBacking/RigidNeonSignWithBacking';
import ModularLightbox from './scripts/products/lightbox/ModularLightbox/ModularLightbox';
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
import EtchedFlatCut from './scripts/products/wayfinding/EtchedFlatCut/EtchedFlatCut';

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

	const quoteComponents: Record<string, JSX.Element> = {
		combineQuotes: <CombineQuotes />,
		EtchedFlatCut: <EtchedFlatCut />,
		ModularLightbox: <ModularLightbox />,
		AcrylicSideLit: <AcrylicSideLit />,
		AcrylicFrontSideLit: <AcrylicFrontSideLit />,
		AcrylicFrontBackLit: <AcrylicFrontBackLit />,
		AcrylicBackLit: <AcrylicBackLit />,
		AcrylicFrontLit: <AcrylicFrontLit />,
		RigidNeonSignNoBacking: <RigidNeonSignNoBacking />,
		RigidNeonSignWithBacking: <RigidNeonSignWithBacking />,
		FlexNeonSign: <FlexNeonSign />,
		AluminumResinFrontBackLit: <AluminumResinFrontBackLit />,
		AluminumResinFrontLit: <AluminumResinFrontLit />,
		laserCutAcrylic: <LaserCutAcrylic />,
		pvcMetalLaminate: <PVCMetalLaminate />,
		pvcPainted: <PVCPainted />,
		pvcUv: <PVCUv />,
		layeredAcrylic: <LayeredAcrylic />,
		laserCutAluminum: <LaserCutAluminum />,
		uvPrintedAcrylic: <UvPrintedAcrylic />,
		metalLaminateAcrylic: <MetalLaminate />,
		metalChannelTrimlessFrontLit: <TrimLessFrontLit />,
		laserCutStainless: <LaserCutStainless />,
		metalChannelTrimlessFrontAndBackLit: <TrimLessFrontAndBackLit />,
		metalChannelTrimlessBackLit: <TrimLessBackLit />,
		metalFabricatedStainless: <FabricatedStainless />,
		default: <CustomProject />,
	};

	component =
		quoteComponents[window.NovaQuote.quote_div_id] || quoteComponents.default;

	return <AppProvider>{component}</AppProvider>;
}
