import { GetServerSideProps } from 'next';

import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import Globe from '@/components/hero/globe';

const Index = (data: Data) => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		// onError: () => alert('An error happened 💥'),
		// onRelease: () => alert('Screen Wake Lock: released!'),
	});

	if (isSupported) {
		request()
	}

	return <Page title={released ? '🔴 Not Aquired' : '🟢 Aquired'}>
		<Globe lat={data.latitude} long={data.longitude} />
	</Page>
}

export default Index

type Data = {
	latitude: number,
	longitude: number
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({ req }) => {

	const clientIP = req.headers['cf-connecting-ip']
	const res = await fetch(`https://ipapi.co/${clientIP}/json/`)
	const data: Data = await res.json()

	return {
		props: {
			data,
		},
	}
}
