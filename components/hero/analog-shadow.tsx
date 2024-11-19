import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

const AnalogClock = () => {
	const [time, setTime] = useState(new Date(0))
	const [animatedTick, setAnimatedTick] = useState(1)
	const [shouldStartClock, setShouldStartClock] = useState(false)

	useEffect(() => {
		time.setSeconds(0)
		time.setMinutes(0)
		time.setHours(0)
		const timer = setInterval(() => {
			time.setMinutes(animatedTick)

			if (animatedTick >= 60) {
				clearInterval(timer)
				setShouldStartClock(true)
				setTime(
					dayjs().toDate(),
				)
			} else {
				setAnimatedTick(animatedTick + 1)
				setTime(time)
			}
		}, 100)
		return () => clearInterval(timer)
	}, [animatedTick, time])

	useEffect(() => {
		if (shouldStartClock) {
			const timer = setInterval(
				() =>
					setTime(
						dayjs()
							.toDate(),
					),
				1000 * 60,
			)
			return () => clearInterval(timer)
		}
	}, [shouldStartClock])

	const getAngle = (hours: number, minutes: number) => {
		// Calculate angle for hour and minute hands
		const hourAngle = ((hours % 12) + minutes / 60) * 30
		const minuteAngle = minutes * 6
		return { hourAngle, minuteAngle }
	}

	const { hourAngle, minuteAngle } = getAngle(
		time.getHours(),
		time.getMinutes(),
	)

	const isHourAngleLarger = hourAngle - minuteAngle
	const isAngleAbsMoreThan180 = Math.abs(minuteAngle - hourAngle) > 180
	const isDarkMode = () => {
		if (typeof window !== 'undefined') {
			return (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			)
		}
		return true
	}

	return (
		<div className='flex flex-row h-screen justify-center items-center w-full'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 200 200'
				className='w-full h-full'
				style={{ scale: 2 }}
			>
				{/* Clock face background */}
				<circle
					cx='100'
					cy='100'
					r='90'
					fill={isDarkMode() ? 'rgb(39,39,42)' : 'rgb(115,115,115)'}
					stroke='black'
					strokeWidth='2'
				/>

				{/* Red shaded area from minute to hour */}

				<path
					d={`
						M100,100
						L${100 + 90 * Math.cos(((minuteAngle - 90) * Math.PI) / 180)},
						${100 + 90 * Math.sin(((minuteAngle - 90) * Math.PI) / 180)}
						A90,90 0 ${isHourAngleLarger > 0 ? (isAngleAbsMoreThan180 ? 0 : 1) : isAngleAbsMoreThan180 ? 1 : 0},0
						${100 + 90 * Math.cos(((hourAngle - 90) * Math.PI) / 180)},
						${100 + 90 * Math.sin(((hourAngle - 90) * Math.PI) / 180)}
						Z
					`}
					fill={isDarkMode() ? 'rgb(9,9,11)' : 'rgb(64,64,64)'}
				/>

				{/* Hour markers */}
				{[...Array(12)].map((_, i) => (
					<line
						key={i}
						x1='100'
						y1='15'
						x2='100'
						y2='25'
						stroke='black'
						strokeWidth='2'
						transform={`rotate(${i * 30}, 100, 100)`}
					/>
				))}

				{/* Hour hand */}
				<line
					x1='100'
					y1='100'
					x2={100 + 50 * Math.cos(((hourAngle - 90) * Math.PI) / 180)}
					y2={100 + 50 * Math.sin(((hourAngle - 90) * Math.PI) / 180)}
					stroke='black'
					strokeWidth='4'
				/>

				{/* Minute hand */}
				<line
					x1='100'
					y1='100'
					x2={100 + 70 * Math.cos(((minuteAngle - 90) * Math.PI) / 180)}
					y2={100 + 70 * Math.sin(((minuteAngle - 90) * Math.PI) / 180)}
					stroke='black'
					strokeWidth='2'
				/>

				{/* Center point */}
				<circle cx='100' cy='100' r='5' fill='black' />
			</svg>
		</div>
	)
}

export default AnalogClock
