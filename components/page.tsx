import { useEffect } from 'react'
import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	useEffect(() => {
		// I depend on nothing, I'll run just one time
		document.body.requestFullscreen()
	}, []);

	return (
		<>
			{title ? (
				<Head>
					<title>{title}</title>
				</Head>
			) : null}

			{/* <Appbar /> */}

			<main>
				<div>{children}</div>
			</main>

			{/* <BottomNav /> */}
		</>
	)
}

export default Page
