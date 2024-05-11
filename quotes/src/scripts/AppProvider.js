import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}

export function AppProvider({ children }) {
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');

	const [isLoading, setIsLoading] = useState(false);

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
