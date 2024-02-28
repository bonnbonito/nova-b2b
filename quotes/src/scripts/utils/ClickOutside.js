import { useEffect } from 'react';

// Hook
export default function useOutsideClick(refs, callback) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				refs.every((ref) => ref.current && !ref.current.contains(event.target))
			) {
				callback();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs, callback]); // Depend on the entire refs array
}
