import Head from 'next/head'
import { useWakeLock } from 'react-screen-wake-lock'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useKBar } from 'kbar'
import { tinykeys } from 'tinykeys'
import { routeList } from '@/components/search/Actions'

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

	useEffect(() => {
		let unsubscribe = tinykeys(window, {
			'ctrl+k': () => {
				query.toggle()
			},
			h: async () => {
				await router.push('/')
			},
			f: () => {
				toggleFullScreen()
			},
			arrowleft: () => {
				let nextRouteIndex =
					routeList.findIndex((route) => {
						return route == router.pathname
					}) || 0

				nextRouteIndex =
					nextRouteIndex - 1 < 0 ? routeList.length : nextRouteIndex

				window.location.href = routeList[nextRouteIndex - 1]
			},
			arrowright: () => {
				let nextRouteIndex =
					routeList.findIndex((route) => {
						return route == router.pathname
					}) || 0

				nextRouteIndex =
					nextRouteIndex + 1 > routeList.length - 1 ? -1 : nextRouteIndex

				window.location.href = routeList[nextRouteIndex + 1]
			},
		})
		return () => {
			unsubscribe()
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
