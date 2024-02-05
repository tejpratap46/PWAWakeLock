import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import CalendarView from '@/components/hero/cal';

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
		<CalendarView />
	</Page>
}

export default Index
