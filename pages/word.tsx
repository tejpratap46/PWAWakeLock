import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import WordClock from '@/components/hero/word-clock';

const Index = () => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		// onError: () => alert('An error happened 💥'),
		// onRelease: () => alert('Screen Wake Lock: released!'),
	});

	if (isSupported) {
		request()
	}

	return <Page title={released ? '🔴 Not Aquired' : '🟢 Aquired'}>
		<WordClock />
	</Page>
}

export default Index
