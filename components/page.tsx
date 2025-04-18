import Head from 'next/head'
import { useWakeLock } from 'react-screen-wake-lock'
import React from 'react'
import { useRouter } from 'next/router'
import useKeyboardEvent from '@/components/utils/useKeyboardEvent'
import { useKBar } from 'kbar'

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

	const router = useRouter()
	const { query } = useKBar()

	if (isSupported) {
		request().then((r) => {})
	}

	const toggleFullScreen = () => {
		if (document.fullscreenElement == null) {
			document.body.requestFullscreen().then((r) => {})
		} else {
			document.exitFullscreen().then((r) => {})
		}
	}

	const routeList: string[] = [
		'/',
		'/world',
		'/vertical',
		'/word',
		'/pw',
		'/globe',
		'/analog',
		'/apple',
		'/shadow'
	]

	useKeyboardEvent(['ArrowLeft', 'ArrowRight', 'F', 'f'], (event) => {
		switch (event.key) {
			case 'ArrowLeft': {
				const currentRoute = router.pathname
				// const nextRoute = routeMap[currentRoute]?.at(0) || ''
				// router.push(nextRoute).then(r => {})
				let nextRouteIndex =
					routeList.findIndex((route) => {
						return route == currentRoute
					}) || 0

				nextRouteIndex =
					nextRouteIndex - 1 < 0 ? routeList.length : nextRouteIndex

				window.location.href = routeList[nextRouteIndex - 1]
				break
			}
			case 'ArrowRight': {
				const currentRoute = router.pathname
				// const nextRoute = routeMap[currentRoute]?.at(1) || ''
				// router.push(nextRoute).then(r => {})
				let nextRouteIndex =
					routeList.findIndex((route) => {
						return route == currentRoute
					}) || 0

				nextRouteIndex =
					nextRouteIndex + 1 > routeList.length - 1 ? -1 : nextRouteIndex

				window.location.href = routeList[nextRouteIndex + 1]
				break
			}
			case 'F':
			case 'f': {
				toggleFullScreen()
				break
			}
			case 'k':
			case 'K': {
				query.toggle()
				break
			}
			default:
				console.error("Key not handled", event.key)
				break
		}
	})

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
					toggleFullScreen()
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
