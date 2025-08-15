import React, { useEffect, useState } from 'react'

interface Weather {
	name: string
	main: { temp: number }
	weather: { main: string; description: string; icon: string }[]
	dt: number
	timezone: number
}

interface WeatherCardProps {
	city?: string | undefined
}

export default function WeatherCard({ city }: WeatherCardProps): JSX.Element {
	if (!city) {
		city = 'Delhi'
	}
	const [data, setData] = useState<Weather | null>(null)
	const [loading, setLoading] = useState(false)
	const [currentTime, setCurrentTime] = useState<Date>(new Date())

	const apiKey: String = process.env.OPENWEATHER_API_KEY || ""
	if (!apiKey) {
		throw new Error('OPENWEATHER_API_KEY is not set in environment variables')
	}
	async function fetchWeather() {
		setLoading(true)
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
			)
			const json = await res.json()
			setData(json)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchWeather()
	}, [])

	// Update time every second
	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timeInterval)
	}, [])

	const renderEffect = () => {
		if (!data) return null
		const condition = data.weather[0].main.toLowerCase()
		const videos: Record<string, string> = {
			snow: '/videos/snow.mp4',
			rain: '/videos/rain-night.mp4',
			clear: '/videos/clear.mp4',
			clouds: '/videos/clouds.mp4',
			thunderstorm: '/videos/thunderstorm-night.mp4',
			mist: '/videos/mist.mp4',
			fog: '/videos/fog.mp4',
			drizzle: '/videos/drizzle.mp4',
			haze: '/videos/haze.mp4',
		}
		const videoSrc = videos[condition] || videos['clear']
		return (
			<video
				className='absolute inset-0 w-full h-full object-cover'
				src={videoSrc}
				autoPlay
				loop
				muted
				playsInline
			/>
		)
	}

	const getLocalTime = () => {
		if (!data) return ''
		// Calculate the local time using the timezone offset from OpenWeatherMap API
		// data.timezone is the offset in seconds from UTC
		const utcTime =
			currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000
		const localTime = new Date(utcTime + data.timezone * 1000)
		return localTime.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getLocalDate = () => {
		if (!data) return ''
		// Calculate the local date using the timezone offset from OpenWeatherMap API
		// data.timezone is the offset in seconds from UTC
		const utcTime =
			currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000
		const localDate = new Date(utcTime + data.timezone * 1000)
		return localDate.toLocaleDateString(undefined, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}

	return (
		<main className='min-h-screen w-full text-white relative overflow-hidden'>
			{renderEffect()}
			<div className='absolute inset-0 bg-black/30' />
			{loading && (
				<p className='absolute inset-0 flex items-center justify-center'>
					Loading…
				</p>
			)}
			{data && (
				<>
					<div className='absolute top-8 right-8 text-right'>
						<p className='text-3xl font-bold flex items-center justify-end gap-2'>
							<span>{data.name}</span>
							<img
								src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
								alt={data.weather[0].description}
								className='w-12 h-12'
								width={12}
								height={12}
							/>
						</p>
						<p
							className='text-lg capitalize'
							style={{
								fontFamily: 'Kode Mono',
							}}
						>
							{data.weather[0].main}
						</p>
						<p
							className='text-7xl font-bold'
							style={{
								fontFamily: 'Concert One',
							}}
						>
							{Math.round(data.main.temp)}°
						</p>
					</div>
					<div className='absolute bottom-8 left-8'>
						<p
							className='text-6xl font-semibold'
							style={{
								fontFamily: 'Kode Mono',
							}}
						>
							{getLocalTime()}
						</p>
						<p className='text-lg opacity-80'>{getLocalDate()}</p>
					</div>
				</>
			)}
		</main>
	)
}
