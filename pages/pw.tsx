import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import ConcentricRotatingWatchface from '@/components/hero/pixel-watch'

const Index = () => {
	return (
		<Page>
			<ConcentricRotatingWatchface />
		</Page>
	)
}

export default Index
