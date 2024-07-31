import React, { useEffect } from 'react';
import Select from 'react-select';
import SidebarAdmin from '../../SidebarAdmin';
import Signage from '../../Signage';
import AccordionGroup from './components/AccordionGroup';

import { useAppContext } from '../../AppProvider';
import { CombineQuoteProvider } from './CombineQuoteContext';

/*Acrylic */
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
import { Logo as AluminumResinFrontBackLitLogo } from '../metal-channel/AluminumResinFrontBackLit/components/Logo';
import { Letters as AluminumResinFrontLit } from '../metal-channel/AluminumResinFrontLit/components/Letters';
import { Logo as AluminumResinFrontLitLogo } from '../metal-channel/AluminumResinFrontLit/components/Logo';
import { Letters as TrimLessBackLit } from '../metal-channel/TrimLessBackLit/components/Letters';
import { Logo as TrimLessBackLitLogo } from '../metal-channel/TrimLessBackLit/components/Logo';
import { Letters as TrimLessFrontAndBackLit } from '../metal-channel/TrimLessFrontAndBackLit/components/Letters';
import { Logo as TrimLessFrontAndBackLitLogo } from '../metal-channel/TrimLessFrontAndBackLit/components/Logo';
import { Letters as TrimLessFrontLit } from '../metal-channel/TrimLessFrontLit/components/Letters';
import { Logo as TrimLessFrontLitLogo } from '../metal-channel/TrimLessFrontLit/components/Logo';
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
/**ACRYLIC CHANNEL LETTERS */
import { Letters as AcrylicBackLitLetters } from '../acrylic-channel/AcrylicBackLit/components/Letters';
import { Logo as AcrylicBackLitLogo } from '../acrylic-channel/AcrylicBackLit/components/Logo';
import { Letters as AcrylicFrontBackLitLetters } from '../acrylic-channel/AcrylicFrontBackLit/components/Letters';
import { Logo as AcrylicFrontBackLitLogo } from '../acrylic-channel/AcrylicFrontBackLit/components/Logo';
import { Letters as AcrylicFrontLitLetters } from '../acrylic-channel/AcrylicFrontLit/components/Letters';
import { Logo as AcrylicFrontLitLogo } from '../acrylic-channel/AcrylicFrontLit/components/Logo';
import { Letters as AcrylicFrontSideLitLetters } from '../acrylic-channel/AcrylicFrontSideLit/components/Letters';
import { Logo as AcrylicFrontSideLitLogo } from '../acrylic-channel/AcrylicFrontSideLit/components/Logo';
import { Letters as AcrylicSideLitLetters } from '../acrylic-channel/AcrylicSideLit/components/Letters';
import { Logo as AcrylicSideLitLogo } from '../acrylic-channel/AcrylicSideLit/components/Logo';

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
			if (NovaQuote.project_folder_status) {
				setTempFolder(
					`${NovaQuote.project_folder_status}/Q-${NovaQuote.current_quote_id}`
				);
			} else {
				setTempFolder(`Q-${NovaQuote.current_quote_id}`);
			}
		}
	}, []);

	const showComponent = (item) => {
		let output;
		switch (item.component) {
			case 'ThreeDLayer':
				output = (
					<ThreeDLayer key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'AcrylicSideLit':
				if (item.type === 'letters') {
					output = (
						<AcrylicSideLitLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicSideLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcrylicFrontSideLit':
				if (item.type === 'letters') {
					output = (
						<AcrylicFrontSideLitLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicFrontSideLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcrylicFrontBackLit':
				if (item.type === 'letters') {
					output = (
						<AcrylicFrontBackLitLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicFrontBackLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcrylicBackLit':
				if (item.type === 'letters') {
					output = (
						<AcrylicBackLitLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicBackLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcrylicFrontLit':
				if (item.type === 'letters') {
					output = (
						<AcrylicFrontLitLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicFrontLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
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
				if (item.type === 'letters') {
					output = (
						<AluminumResinFrontBackLit
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AluminumResinFrontBackLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AluminumResinFrontLit':
				if (item.type === 'letters') {
					output = (
						<AluminumResinFrontLit
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AluminumResinFrontLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
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
				if (item.type === 'letters') {
					output = (
						<TrimLessFrontAndBackLit
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<TrimLessFrontAndBackLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'TrimLessFrontLit':
				if (item.type === 'letters') {
					output = (
						<TrimLessFrontLit
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<TrimLessFrontLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'TrimLessBackLit':
				if (item.type === 'letters') {
					output = (
						<TrimLessBackLit
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<TrimLessBackLitLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
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

					{signage.map((item, index) => {
						return (
							<Signage
								index={index}
								id={item.id}
								item={item}
								storage={storage}
								editable={item.isLayer ? false : true}
							>
								{showComponent(item)}
							</Signage>
						);
					})}

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
