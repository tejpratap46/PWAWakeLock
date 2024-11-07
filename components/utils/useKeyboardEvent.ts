import { useEffect } from 'react';

type KeyHandler = (event: KeyboardEvent, key: string) => void;

function useKeyboardEvent(keys: string[], handler: KeyHandler): void {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (keys.indexOf(event.key)) {
				handler(event, event.key);
			}
		};

		// Add event listener when the component mounts
		window.addEventListener('keydown', handleKeyDown);

		// Clean up event listener when the component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [keys, handler]);
}

export default useKeyboardEvent;
