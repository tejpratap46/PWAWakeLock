import React, { useEffect, useState } from 'react'

const ConcentricRotatingWatchface = () => {
	const HOUR = 'hour'
	const MINUTE = 'minute'
	const SECOND = 'second'

	const [time, setTime] = useState(new Date(0))
	const [animatedTick, setAnimatedTick] = useState(1)
	const [shouldStartClock, setShouldStartClock] = useState(false)

	useEffect(() => {
		time.setSeconds(0)
		time.setMinutes(0)
		time.setHours(0)
		const timer = setInterval(() => {
			time.setSeconds(animatedTick)
			time.setMinutes(animatedTick)
			time.setHours(animatedTick / 5)

			if (animatedTick >= 60) {
				clearInterval(timer)
				setShouldStartClock(true)
				setTime(new Date())
			} else {
				setAnimatedTick(animatedTick + 1)
				setTime(time)
			}
		}, 100)
		return () => clearInterval(timer)
	}, [animatedTick, time])

	useEffect(() => {
		if (shouldStartClock) {
			const timer = setInterval(() => setTime(new Date()), 1000)
			return () => clearInterval(timer)
		}
	}, [shouldStartClock])

	const size: number = 400 * 2
	const center: number = size / 2
	const hourRadius: number = 70 * 2
	const minuteRadius: number = 110 * 2
	const secondRadius: number = 150 * 2

	const hours: number = time.getHours() % 12
	const minutes: number = time.getMinutes()
	const seconds: number = time.getSeconds()

	const getColor = (type: string, index: number, value: number) => {
		const hideThreshold = 2
		let isVisible = index % 5 == 0 && Math.abs(index - value) > hideThreshold
		if (isVisible && index == 0 && value + hideThreshold >= 60) {
			isVisible = false
		}
		if (index == value) {
			return 'fill-red-900'
		} else if (isVisible || type == HOUR) {
			return 'fill-slate-400 dark:fill-white'
		} else {
			return 'fill-transparent'
		}
	}

	const getFontFamily = (type: string) => {
		if (type == HOUR) {
			return 'Lilita One'
		} else if (type == MINUTE) {
			return 'Monoton'
		} else {
			return 'Kode Mono'
		}
	}

	const getValue = (type: string, index: number) => {
		if (type == HOUR) {
			return index || 12
		} else {
			return index
		}
	}

	const createRing = (
		type: string,
		radius: number,
		count: number,
		value: number,
		fontSize: number,
	) => {
		const items = []
		for (let i = 0; i < count; i++) {
			const angle = (i * (360 / count) - 90) * (Math.PI / 180)
			const x = center + radius * Math.cos(angle)
			const y = center + radius * Math.sin(angle)
			items.push(
				<text
					key={i}
					className={getColor(type, i, value)}
					x={x}
					y={y}
					fill='none'
					fontSize={i == value ? fontSize : fontSize / 1.5}
					fontWeight={i == value ? 'normal' : 'lighter'}
					fontFamily={getFontFamily(type)}
					textAnchor='middle'
					alignmentBaseline='central'
					transform={`rotate(${i * (360 / count) - 90}, ${x}, ${y})`}
				>
					{getValue(type, i).toString().padStart(2, '0')}
				</text>,
			)
		}
		return items
	}

	return (
		<div className='flex flex-row min-h-screen justify-center items-center w-full'>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				style={{ transform: 'rotate(90deg)', margin: 'auto' }}
			>
				{/* Hour ring */}
				<g transform={`rotate(${-hours * 30}, ${center}, ${center})`}>
					{createRing(HOUR, hourRadius, 12, hours, 64)}
				</g>

				{/* Minute ring */}
				<g transform={`rotate(${-minutes * 6}, ${center}, ${center})`}>
					{createRing(MINUTE, minuteRadius, 60, minutes, 48)}
				</g>

				{/* Second ring */}
				<g transform={`rotate(${-seconds * 6}, ${center}, ${center})`}>
					{createRing(SECOND, secondRadius, 60, seconds, 32)}
				</g>

				{/* Center dot */}
				<circle cx={center} cy={center} r={5} fill='#ffffff' />
			</svg>
		</div>
	)
}

export default ConcentricRotatingWatchface
