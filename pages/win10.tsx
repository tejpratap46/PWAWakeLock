import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import Windows10 from '@/components/hero/windows-10-update';

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
		<Windows10 />
	</Page>
}

export default Index
