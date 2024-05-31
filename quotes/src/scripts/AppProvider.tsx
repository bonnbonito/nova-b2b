import React, { createContext, useContext, useEffect, useState } from 'react';

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

	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;

	const updateSignageItem = (id: string, key: string, value: any) => {
		setSignage((prevSignage) =>
			prevSignage.map((signage) =>
				signage.id === id ? { ...signage, [key]: value } : signage
			)
		);
	};

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
