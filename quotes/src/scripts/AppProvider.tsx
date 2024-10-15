import React, { createContext, useContext, useEffect, useState } from 'react';
import { hasFileUploadedCheck } from './utils/helpers';

interface AppContextType {
	signage: any[];
	setSignage: (signage: any[]) => void;
	missing: any[];
	setMissing: (missing: any[]) => void;
	tempFolder: string;
	tempFolderName: string;
	isLoading: boolean;
	partner: number;
	setPartner: (partner: number) => void;
	setTempFolder: (tempFolder: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	updateSignageItem: (id: string, key: string, value: any) => void;
	hasUploadedFile: boolean;
	setHasUploadedFile: (hasUploadedFile: boolean) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType>({
	signage: [],
	setSignage: () => {},
	missing: [],
	setMissing: () => {},
	tempFolder: '',
	tempFolderName: '',
	isLoading: false,
	setTempFolder: () => {},
	setIsLoading: () => {},
	setPartner: () => parseInt(NovaQuote.user_id),
	partner: parseInt(NovaQuote.user_id),
	updateSignageItem: () => {},
	hasUploadedFile: false,
	setHasUploadedFile: () => {},
});

export function useAppContext() {
	return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [signage, setSignage] = useState<any[]>([]);
	const [missing, setMissing] = useState<any[]>([]);
	const [tempFolder, setTempFolder] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [partner, setPartner] = useState<number>(parseInt(NovaQuote.user_id));
	const [hasUploadedFile, setHasUploadedFile] = useState<boolean>(false);

	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;

	const updateSignageItem = (id: string, key: string, value: any) => {
		setSignage((prevSignage) =>
			prevSignage.map((signage) =>
				signage.id === id ? { ...signage, [key]: value } : signage
			)
		);
	};

	const loadingFonts = async () => {
		const loadPromises = NovaQuote.fonts.map((font) => loadFont(font));
		await Promise.all(loadPromises);
	};

	async function loadFont({ name, src }) {
		const fontFace = new FontFace(name, `url(${src})`);

		try {
			await fontFace.load();
			document.fonts.add(fontFace);
		} catch (e) {
			console.error(`Font ${name} failed to load`);
		}
	}

	useEffect(() => {
		console.log('Attempting to preload fonts...');
		async function preloadFonts() {
			try {
				await loadingFonts();
			} catch (error) {
				console.error('Error loading fonts:', error);
			}
		}
		preloadFonts();
	}, []);

	useEffect(() => {
		const hasFile = hasFileUploadedCheck(signage);
		console.log(hasFile);
		setHasUploadedFile(() => hasFile);
	}, [signage]);

	return (
		<AppContext.Provider
			value={{
				signage,
				setSignage,
				missing,
				setMissing,
				tempFolder,
				tempFolderName,
				isLoading,
				setTempFolder,
				setIsLoading,
				setPartner,
				partner,
				updateSignageItem,
				hasUploadedFile,
				setHasUploadedFile,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
