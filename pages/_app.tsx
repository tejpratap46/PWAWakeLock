import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import { KBarProvider } from 'kbar'
import '@/styles/globals.css'
import CommandPalette from '@/components/search/CommandPalette'
import { actions } from '@/components/search/Actions'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<KBarProvider actions={actions}>
				<Component {...pageProps} />
				<CommandPalette />
			</KBarProvider>
		</ThemeProvider>
	)
}

export default App
