import { GetServerSideProps } from 'next';

import Page from '@/components/page'

import { useWakeLock } from 'react-screen-wake-lock'

import Globe from '@/components/hero/globe';

const Index = () => {
	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		// onError: () => alert('An error happened 💥'),
		// onRelease: () => alert('Screen Wake Lock: released!'),
	});

	if (isSupported) {
		request()
	}

	return <Page title={released ? '🔴 Not Aquired' : '🟢 Aquired'}>
		<Globe />
	</Page>
}

export default Index

type Data = {
	country: string,
	countryCode: string,
	lat: number,
	lon: number
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {

	const clientIP = context.req.headers["x-real-ip"]
	const res = await fetch(`http://ip-api.com/json/${clientIP}`)
	const data: Data = await res.json()

	return {
	  props: {
		data,
	  },
	}
  }
