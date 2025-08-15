import Page from '@/components/page'
import WeatherCard from '@/components/hero/weather-card'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useSearchParams } from 'next/navigation'

const Weather = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const searchParams = useSearchParams()

	const city = searchParams.get('city')

	return (
		<Page>
			<WeatherCard city={city || data.city} />
		</Page>
	)
}

export default Weather

type Data = {
	latitude: number
	longitude: number
	city?: string
	country?: string
}
type ApiResponse = {
	loc: string
	city: string
}

export const getServerSideProps = (async ({ req }) => {
	// Fetch data from external API
	const clientIP = req.headers['cf-connecting-ip'] || '106.196.18.188'
	const res = await fetch(
		`https://ipinfo.io/${clientIP}/json?token=ef8461623ce04a`,
	)
	const apiResponse: ApiResponse = await res.json()
	// Pass data to the page via props
	const [lat, long] = apiResponse.loc.split(',')

	const data: Data = {
		latitude: parseFloat(lat),
		longitude: parseFloat(long),
		city: apiResponse.city,
	}

	return { props: { data } }
}) satisfies GetServerSideProps<{ data: Data }>
