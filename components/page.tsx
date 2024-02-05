import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	return (
		<>
			{title ? (
				<Head>
					<title>{title}</title>
				</Head>
			) : null}

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
			</main>

			{/* <BottomNav /> */}
		</>
	)
}

export default Page
