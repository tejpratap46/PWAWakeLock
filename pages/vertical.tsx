import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import VerticalTimeBar from '@/components/hero/vertical-clock'

const Index = () => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		// onError: () => alert('An error happened 💥'),
		// onRelease: () => alert('Screen Wake Lock: released!'),
	})

	if (isSupported) {
		request()
	}

	return (
		<Page title={released ? '🔴 Not Aquired' : '🟢 Aquired'}>
			<VerticalTimeBar />
		</Page>
	)
}

export default Index
