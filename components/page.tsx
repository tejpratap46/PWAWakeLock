import Head from 'next/head'
import { useWakeLock } from 'react-screen-wake-lock'
import React from 'react'
import { useRouter } from 'next/router'
import useKeyboardEvent from '@/components/utils/useKeyboardEvent'

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

	const router = useRouter();

	if (isSupported) {
		request().then(r => {})
	}

	const routeMap: Record<string,[string, string]> = {
		'/' : ['/apple', '/vertical'],
		'/vertical' : ['/', '/word'],
		'/word' : ['/vertical', '/pw'],
		'/pw' : ['/word', '/globe'],
		'/globe' : ['/pw', '/analog'],
		'/analog' : ['/globe', '/apple'],
		'/apple' : ['/analog', '/']
	}

	useKeyboardEvent('ArrowLeft', () => {
		const currentRoute = router.pathname
		const nextRoute = routeMap[currentRoute]?.at(0) || ''
		router.push(nextRoute).then(r => {})
	});

	useKeyboardEvent('ArrowRight', () => {
		const currentRoute = router.pathname
		const nextRoute = routeMap[currentRoute]?.at(1) || ''
		router.push(nextRoute).then(r => {})
	});

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
						document.body.requestFullscreen().then(r => {})
					} else {
						document.exitFullscreen().then(r => {})
					}
				}}
			>
				<div>{children}</div>
				{/* <BrowserTabSwitchWarning /> */}
			</main>

			{/* <BottomNav /> */}
		</>
	)
}

export default Page
