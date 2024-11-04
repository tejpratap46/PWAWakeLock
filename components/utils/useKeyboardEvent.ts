import { useEffect } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

function useKeyboardEvent(key: string, handler: KeyHandler): void {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === key) {
				handler(event);
			}
		};

		// Add event listener when the component mounts
		window.addEventListener('keydown', handleKeyDown);

		// Clean up event listener when the component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [key, handler]);
}

export default useKeyboardEvent;
