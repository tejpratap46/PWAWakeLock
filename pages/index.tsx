import Image from 'next/image'
import Page from '@/components/page'
import Section from '@/components/section'
import { useWakeLock } from 'react-screen-wake-lock'

const Index = () => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		onError: () => alert('An error happened 💥'),
		onRelease: () => alert('Screen Wake Lock: released!'),
	});

	if (isSupported) {
		request()
	}

	return <Page title={released ? 'Not Aquired' : 'Aquired'}>
		<Section>
			<div className="flex items-center justify-center h-1/2">
				{
					released ?
						<Image src={'/images/grimacing-face.svg'} alt='Lock NOT Aquired Emoji' width={100} height={100} />
						:
						<Image src={'/images/star-struck.svg'} alt='Lock Aquired Emoji' width={100} height={100} />
				}
			</div>
			<div className="flex items-center justify-center h-1/2">
				{
					released ? <h2>Wake Lock Is NOT Acquired</h2> : <h2>Wake Lock Is Acquired</h2>
				}
			</div>

			<hr className='my-16' />

			<p>Tips:</p>
			<ul>
				<li>
					▲ Do not move away from this tab or monimize Browser.
				</li>
				<li>
					▲ Use latest version of chrome.
				</li>
			</ul>
		</Section>
	</Page>
}

export default Index
