import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import {
	KBarProvider,
	KBarPortal,
	KBarPositioner,
	KBarAnimator,
	KBarSearch,
	useMatches,
	NO_GROUP
} from "kbar";
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	const actions = [
		{
			id: "blog",
			name: "Blog",
			shortcut: ["b"],
			keywords: "writing words",
			perform: () => (window.location.pathname = "blog"),
		},
		{
			id: "contact",
			name: "Contact",
			shortcut: ["c"],
			keywords: "email",
			perform: () => (window.location.pathname = "contact"),
		},
	]

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<KBarProvider actions={actions}>
				<KBarPortal>
					<KBarPositioner>
						<KBarAnimator>
							<KBarSearch />
						</KBarAnimator>
					</KBarPositioner>
				</KBarPortal>

				<Component {...pageProps} />

			</KBarProvider>
		</ThemeProvider>
	)
}

export default App
