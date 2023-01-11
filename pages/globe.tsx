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
type ApiResponse = {
	loc: string
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({ req }) => {

	const clientIP = req.headers['cf-connecting-ip']
	const res = await fetch(`https://ipinfo.io/${clientIP}/json?token=ef8461623ce04a`)
	const apiResponse: ApiResponse = await res.json()

	const [lat, long] = apiResponse.loc.split(",")

	const data: Data = {
		latitude: parseFloat(lat),
		longitude: parseFloat(long)
	}

	return {
		props: {
			data,
		},
	}
}
