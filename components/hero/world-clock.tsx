import React, { useEffect, useMemo, useState } from 'react'
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
	ZoomableGroup,
} from 'react-simple-maps'
import { motion } from 'framer-motion'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const CITIES = [
	{
		id: 'del',
		name: 'Delhi',
		country: 'India',
		tz: 'Asia/Kolkata',
		coordinates: [77.209, 28.6139],
	},
	{
		id: 'per',
		name: 'Paris',
		country: 'France',
		tz: 'Europe/Paris',
		coordinates: [2.3514, 48.8575],
	},
	{
		id: 'nyc',
		name: 'New York',
		country: 'USA',
		tz: 'America/New_York',
		coordinates: [-74.006, 40.7128],
	},
	{
		id: 'seo',
		name: 'Seoul',
		country: 'South Korea',
		tz: 'Asia/Seoul',
		coordinates: [126.9784, 37.5665],
	},
	{
		id: 'syd',
		name: 'Sydney',
		country: 'Australia',
		tz: 'Australia/Sydney',
		coordinates: [151.2093, -33.8688],
	},
] as const

function formatTime(date: Date, timeZone: string) {
	return new Intl.DateTimeFormat(undefined, {
		timeZone,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	}).format(date)
}

function formatDate(date: Date, timeZone: string) {
	return new Intl.DateTimeFormat(undefined, {
		timeZone,
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(date)
}

function useTicker(intervalMs = 1000) {
	const [now, setNow] = useState<Date>(new Date())
	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), intervalMs)
		return () => clearInterval(id)
	}, [intervalMs])
	return now
}

export default function WorldClockMap() {
	const now = useTicker(1000)
	const [activeId, setActiveId] = useState<
		(typeof CITIES)[number]['id'] | null
	>('del')

	const activeCity = useMemo(
		() => CITIES.find((c) => c.id === activeId) ?? CITIES[0],
		[activeId],
	)

	const progress = useMemo(() => {
		const secondsSinceMidnight =
			now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
		return (secondsSinceMidnight / 86400) * 100
	}, [now])

	return (
		<div className='min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col'>
			<div className='h-2 w-full bg-slate-800'>
				<div
					className='h-2 bg-cyan-400 transition-all duration-500'
					style={{ width: `${progress}%` }}
				></div>
			</div>

			<main className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6 flex-1'>
				<section className='col-span-2 bg-slate-900/50 rounded-2xl shadow-inner p-2 md:p-4'>
					<div className='relative aspect-[16/9] w-full overflow-hidden rounded-xl'>
						<ComposableMap
							projectionConfig={{ scale: 165 }}
							className='w-full h-full'
						>
							<ZoomableGroup
								center={
									activeCity
										? ([...activeCity.coordinates] as [number, number])
										: [0, 0]
								}
								zoom={1.2}
							>
								<Geographies geography={geoUrl}>
									{({ geographies }) =>
										geographies.map((geo) => (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												style={{
													default: {
														fill: '#0f172a',
														stroke: '#1f2937',
														strokeWidth: 0.5,
													},
													hover: { fill: '#111827' },
													pressed: { fill: '#0f172a' },
												}}
											/>
										))
									}
								</Geographies>

								{CITIES.map((c) => (
									<Marker
										key={c.id}
										coordinates={c.coordinates as [number, number]}
									>
										<motion.g
											initial={{ y: -4, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												type: 'spring',
												stiffness: 200,
												damping: 20,
											}}
											onClick={() => setActiveId(c.id)}
											style={{ cursor: 'pointer' }}
										>
											<circle
												r={6}
												className={
													c.id === activeId
														? 'fill-cyan-400 stroke-white/80'
														: 'fill-emerald-400/90 stroke-white/60'
												}
												strokeWidth={1}
											/>
											<text
												textAnchor='start'
												x={10}
												y={-4}
												className='fill-white text-[14px] font-medium'
											>
												{c.name}
											</text>
											<text
												textAnchor='start'
												x={10}
												y={8}
												className='fill-cyan-300 text-[10px] font-mono'
											>
												{formatTime(now, c.tz)}
											</text>
										</motion.g>
									</Marker>
								))}
							</ZoomableGroup>
						</ComposableMap>
					</div>
				</section>

				<section className='space-y-3'>
					<div className='bg-slate-900/50 rounded-2xl p-4'>
						<h2 className='text-lg font-semibold mb-3 text-center'>Cities</h2>
						<ul className='space-y-3'>
							{CITIES.map((c) => {
								const isActive = c.id === activeId
								return (
									<li key={c.id}>
										<button
											onClick={() => setActiveId(c.id)}
											className={
												'w-full flex items-center justify-between gap-3 rounded-xl p-3 transition ' +
												(isActive
													? 'bg-cyan-500/10 ring-1 ring-cyan-400/40'
													: 'hover:bg-slate-800/60')
											}
											aria-pressed={isActive}
										>
											<div className='text-left'>
												<div className='text-base font-medium'>
													{c.name}{' '}
													<span className='opacity-60'>• {c.country}</span>
												</div>
												<div className='text-xs opacity-70'>
													{formatDate(now, c.tz)}
												</div>
											</div>
											<div className='font-mono text-xl tabular-nums'>
												{formatTime(now, c.tz)}
											</div>
										</button>
									</li>
								)
							})}
						</ul>
					</div>
				</section>
			</main>
		</div>
	)
}
