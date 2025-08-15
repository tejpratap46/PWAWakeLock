import React, { useEffect, useState } from 'react'
import Image from "next/image"

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

	const apiKey =
		process.env.REACT_APP_OPENWEATHER_API_KEY ||
		'bd5e378503939ddaee76f12ad7a97608'

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

	const renderEffect = () => {
		if (!data) return null;
		const condition = data.weather[0].main.toLowerCase();
		const videos: Record<string, string> = {
			snow: "/videos/snow.mp4",
			rain: "/videos/rain.mp4",
			clear: "/videos/clear.mp4",
			clouds: "/videos/clouds.mp4",
			thunderstorm: "/videos/thunderstorm-night.mp4",
			mist: "/videos/mist.mp4",
			fog: "/videos/fog.mp4",
			drizzle: "/videos/drizzle.mp4",
			haze: "/videos/haze.mp4",
		};
		const videoSrc = videos[condition] || videos["clear"];
		return (
			<video
				className="absolute inset-0 w-full h-full object-cover"
				src={videoSrc}
				autoPlay
				loop
				muted
				playsInline
			/>
		);
	};

	const getLocalTime = () => {
		if (!data) return "";
		const localTime = new Date((data.dt + data.timezone) * 1000);
		return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<main className="min-h-screen w-full text-white relative overflow-hidden">
			{renderEffect()}
			<div className="absolute inset-0 bg-black/30" />
			{loading && <p className="absolute inset-0 flex items-center justify-center">Loading…</p>}
			{data && (
				<>
					<div className="absolute top-8 right-8 text-right">
						<p className="text-3xl font-bold flex items-center justify-end gap-2">
							<span>{data.name}</span>
							<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} className="w-12 h-12" width={12} height={12} />
						</p>
						<p className="text-lg capitalize">{data.weather[0].main}</p>
						<p className="text-7xl font-bold">{Math.round(data.main.temp)}°</p>
					</div>
					<div className="absolute bottom-8 left-8">
						<p className="text-6xl font-semibold">{getLocalTime()}</p>
						<p className="text-lg opacity-80">{new Date((data.dt + data.timezone) * 1000).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
					</div>
				</>
			)}
		</main>
	);
}
