import React, { useEffect } from 'react';
import Select from 'react-select';
import SidebarAdmin from '../../SidebarAdmin';
import Signage from '../../Signage';
import AccordionGroup from './components/AccordionGroup';

import { useAppContext } from '../../AppProvider';
import { CombineQuoteProvider } from './CombineQuoteContext';

/*Acrlic */
import { Letters as AcrylicLetters } from '../acrylic/LaserCutAcrylic/components/Letters';
import { Logo as AcrylicLogo } from '../acrylic/LaserCutAcrylic/components/Logo';
import { Logo as Acrylic3D } from '../acrylic/LayeredAcrylic/components/Logo';
import { Letters as AcrylicMetalLetters } from '../acrylic/MetalLaminate/components/Letters';
import { Logo as AcrylicMetalLogo } from '../acrylic/MetalLaminate/components/Logo';
import { Logo as AcrylicUV } from '../acrylic/UvPrintedAcrylic/components/Logo';
/*Metal */
import { Letters as MetalFabricatedLetters } from '../metal/FabricatedStainless/components/Letters';
import { Logo as MetalFabricatedLogo } from '../metal/FabricatedStainless/components/Logo';
import { Letters as MetalAluminumLetters } from '../metal/LaserCutAluminum/components/Letters';
import { Logo as MetalAluminumLogo } from '../metal/LaserCutAluminum/components/Logo';
import { Letters as MetalStainlessLetters } from '../metal/LaserCutStainless/components/Letters';
import { Logo as MetalStainlessLogo } from '../metal/LaserCutStainless/components/Logo';
/*MetalChannel */
import { Letters as AluminumResinFrontBackLit } from '../metal-channel/AluminumResinFrontBackLit/components/Letters';
import { Letters as AluminumResinFrontLit } from '../metal-channel/AluminumResinFrontLit/components/Letters';
import { Letters as TrimLessBackLit } from '../metal-channel/TrimLessBackLit/components/Letters';
import { Letters as TrimLessFrontAndBackLit } from '../metal-channel/TrimLessFrontAndBackLit/components/Letters';
import { Letters as TrimLessFrontLit } from '../metal-channel/TrimLessFrontLit/components/Letters';
/*PVC Foam */
import { Letters as PVCMetalLaminateLetters } from '../pvc/PVCMetalLaminate/components/Letters';
import { Logo as PVCMetalLaminateLogo } from '../pvc/PVCMetalLaminate/components/Logo';
import { Letters as PVCPaintedLetters } from '../pvc/PVCPainted/components/Letters';
import { Logo as PVCPaintedLogo } from '../pvc/PVCPainted/components/Logo';
import { Logo as PVCUv } from '../pvc/PVCUv/components/Logo';
/*LED */
import { NeonSign as FlexNeonSign } from '../led-neon/FlexNeonSign/components/NeonSign';
import { NeonSign as RigidNeonSignNoBacking } from '../led-neon/RigidNeonSignNoBacking/components/NeonSign';
import { NeonSign as RigidNeonSignWithBacking } from '../led-neon/RigidNeonSignWithBacking/components/NeonSign';
/*CUSTOM PROJECT */
import { Logo as CustomProject } from '../custom/components/Logo';

const productLines = NovaQuote.product_lines_accordion;

const partners = NovaQuote.show_all_partners;

const storage = window.location.href + NovaQuote.user_id + 'customquote';
const localStorageQuote = localStorage.getItem(storage);
const savedStorage = JSON.parse(localStorageQuote);

export default function CombineQuotes() {
	const { signage, setSignage, setTempFolder, tempFolderName, setPartner } =
		useAppContext();

	function setDefaultSignage() {
		if (savedStorage?.length > 0) {
			setSignage(savedStorage);
		} else {
			setSignage([]);
		}
	}

	useEffect(() => {
		if (NovaQuote.is_editting === '1') {
			const currentSignage = JSON.parse(NovaQuote.signage);

			if (currentSignage) {
				setSignage(currentSignage);
			}
		} else {
			setDefaultSignage();
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(storage, JSON.stringify(signage));
	}, [signage]);

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(tempFolderName);
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
	}, []);

	const showComponent = (item) => {
		let output;
		switch (item.component) {
			case 'CustomProject':
				output = (
					<CustomProject key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'RigidNeonSignNoBacking':
				output = (
					<RigidNeonSignNoBacking
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'RigidNeonSignWithBacking':
				output = (
					<RigidNeonSignWithBacking
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'FlexNeonSign':
				output = (
					<FlexNeonSign key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'AluminumResinFrontBackLit':
				output = (
					<AluminumResinFrontBackLit
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'AluminumResinFrontLit':
				output = (
					<AluminumResinFrontLit
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'PVCUv':
				output = <PVCUv key={item.id} item={item} productId={item.product} />;
				break;
			case 'PVCMetalLaminate':
				if (item.type === 'letters') {
					output = (
						<PVCMetalLaminateLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<PVCMetalLaminateLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'PVCPainted':
				if (item.type === 'letters') {
					output = (
						<PVCPaintedLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<PVCPaintedLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'TrimLessFrontAndBackLit':
				output = (
					<TrimLessFrontAndBackLit
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'TrimLessFrontLit':
				output = (
					<TrimLessFrontLit
						key={item.id}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'TrimLessBackLit':
				output = (
					<TrimLessBackLit key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'MetalFabricated':
				if (item.type === 'letters') {
					output = (
						<MetalFabricatedLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<MetalFabricatedLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'MetalAluminum':
				if (item.type === 'letters') {
					output = (
						<MetalAluminumLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<MetalAluminumLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'MetalStainless':
				if (item.type === 'letters') {
					output = (
						<MetalStainlessLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<MetalStainlessLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcryLic':
				if (item.type === 'letters') {
					output = (
						<AcrylicLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicLogo key={item.id} item={item} productId={item.product} />
					);
				}
				break;
			case 'Acrylic3D':
				output = (
					<Acrylic3D key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'AcrylicUV':
				output = (
					<AcrylicUV key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'AcrylicMetalLaminate':
				if (item.type === 'letters') {
					output = (
						<AcrylicMetalLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicMetalLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			default:
				output = item.component;
		}

		return output;
	};

	return (
		<CombineQuoteProvider>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					<div className="border-gray-200 p-4 rounded-md border mb-4">
						<div className="font-title text-lg mb-4">Select Partner:</div>
						<Select
							className="basic-single"
							classNames={{
								indicatorSeparator: () => 'hidden',
							}}
							classNamePrefix="select"
							isSearchable={true}
							isClearable={true}
							options={partners}
							onChange={(e) => {
								setPartner(() => e?.value ?? NovaQuote.user_id);
							}}
							name="partners"
						/>
					</div>

					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item} storage={storage}>
							{showComponent(item)}
						</Signage>
					))}

					{signage.length < 10 && (
						<div className="gap-2">
							<div className="font-title text-3xl">PRODUCT LINES</div>
							<div className=" border-gray-200 p-4 rounded-md border">
								{productLines.map((productLine) => (
									<AccordionGroup
										group={productLine.product_line}
										products={productLine.products}
									/>
								))}
							</div>
						</div>
					)}
				</div>
				<SidebarAdmin storage={storage} />
			</div>
		</CombineQuoteProvider>
	);
}
