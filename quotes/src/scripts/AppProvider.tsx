import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
	signage: any[];
	setSignage: (signage: any[]) => void;
	missing: any[];
	setMissing: (missing: any[]) => void;
	tempFolder: string;
	tempFolderName: string;
	isLoading: boolean;
	partner: string;
	setPartner: (partner: string) => void;
	setTempFolder: (tempFolder: string) => void;
	setIsLoading: (isLoading: boolean) => void;
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
	setPartner: () => '',
	partner: '',
});

export function useAppContext() {
	return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [signage, setSignage] = useState<any[]>([]);
	const [missing, setMissing] = useState<any[]>([]);
	const [tempFolder, setTempFolder] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [partner, setPartner] = useState<string>('');

	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
