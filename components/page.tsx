import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import { useWakeLock } from 'react-screen-wake-lock'
import BrowserTabSwitchWarning from './BrowserTabSwitchWarning'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		// onError: () => alert('An error happened 💥'),
		// onRelease: () => alert('Screen Wake Lock: released!'),
	})

	if (isSupported) {
		request()
	}

	return (
		<>
			<Head>
				<title>
					{released
						? '🔴 Not Aquired, Refresh Page'
						: '🟢 Aquired, Do now switch page, Press F11 for Full Screen'}
				</title>
			</Head>

			{/* <Appbar /> */}

			<main
				onDoubleClick={() => {
					if (document.fullscreenElement == null) {
						document.body.requestFullscreen()
					} else {
						document.exitFullscreen()
					}
				}}
			>
				<div>{children}</div>
				<BrowserTabSwitchWarning />
			</main>

			{/* <BottomNav /> */}
		</>
	)
}

export default Page
