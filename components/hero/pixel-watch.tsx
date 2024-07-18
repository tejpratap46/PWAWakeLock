import React, { useState, useEffect } from 'react'

const ConcentricRotatingWatchface = () => {
	const [time, setTime] = useState(new Date(0))

	const HOUR = 'hour'
	const MINUTE = 'minute'
	const SECOND = 'second'

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const size: number = 400 * 2
	const center: number = size / 2
	const hourRadius: number = 70 * 2
	const minuteRadius: number = 110 * 2
	const secondRadius: number = 150 * 2

	const hours: number = time.getHours() % 12
	const minutes: number = time.getMinutes()
	const seconds: number = time.getSeconds()

	const getColor = (type: string, index: number, value: number) => {
		const isVisible = (index % 5 == 0) || (type == 'hour')
		if (index == value) {
			return '#ff0000'
		} else if (isVisible && Math.abs((index / 5) - value) > 4) {
			return '#ffffff'
		} else {
			return '#00000000'
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
		if (type == SECOND) {
			return value
		} else {
			return value || 12
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
					x={x}
					y={y}
					fill={getColor(type, i, value)}
					fontSize={i === value ? fontSize : fontSize / 1.5}
					fontWeight={i === value ? 'normal' : 'lighter'}
					fontFamily={getFontFamily(type)}
					textAnchor='middle'
					alignmentBaseline='central'
					transform={`rotate(${i * (360 / count)}, ${x}, ${y})`}
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
