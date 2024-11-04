import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'

const AppleWatchFace = () => {
	const [time, setTime] = useState(new Date(0))
	const [smoothProgress, setSmoothProgress] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	})
	const requestRef = useRef<number>(0)
	const previousTimeRef = useRef<number>(0)

	const getProgress = (current: number, max: number) => (current / max) * 100

	const animate = (time: number) => {
		if (previousTimeRef.current !== undefined) {
			const targetProgress = {
				hours: getProgress(new Date().getHours() % 12 || 0, 12),
				minutes: getProgress(new Date().getMinutes(), 60),
				seconds: getProgress(new Date().getSeconds(), 60),
			}

			setSmoothProgress((prevProgress) => ({
				hours:
					prevProgress.hours +
					(targetProgress.hours - prevProgress.hours) * 0.1,
				minutes:
					prevProgress.minutes +
					(targetProgress.minutes - prevProgress.minutes) * 0.1,
				seconds:
					prevProgress.seconds +
					(targetProgress.seconds - prevProgress.seconds) * 0.1,
			}))
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(requestRef.current!!)
	}, [])

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const createRing = (radius: number, progress: number, color: string) => {
		const circumference = 2 * Math.PI * radius
		const dashLength = (circumference * progress) / 100
		const dashGap = circumference - dashLength

		console.log(`createRing: progress: ${Math.floor(progress)}, color: ${color}`)

		return (
			<circle
				cx='100'
				cy='100'
				r={radius}
				fill='none'
				stroke={color}
				strokeWidth='12'
				strokeLinecap='round'
				strokeDasharray={`${dashLength} ${dashGap}`}
				transform='rotate(-90 100 100)'
			/>
		)
	}

	return (
		<div className='flex flex-row h-screen justify-center items-center w-full'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 200 200'
				className='w-full h-full'
			>
				{createRing(60, smoothProgress.hours, '#FF3B30')}
				{createRing(45, smoothProgress.minutes, '#4CD964')}
				{createRing(30, smoothProgress.seconds, '#007AFF')}
				{/*{[...Array(12)].map((_, i) => {
					const angle = ((i * 30 - 90) * Math.PI) / 180
					const x = 100 + 100 * Math.cos(angle)
					const y = 100 + 100 * Math.sin(angle)
					return <circle key={i} cx={x} cy={y} r='2' fill='#FFF' />
				})}*/}
				<text
					x='100'
					y='25'
					fontFamily='Concert One'
					fill='#FFF'
					fontSize='16'
					textAnchor='middle'
					dominantBaseline='middle'
				>
					{dayjs(time).format('hh_mm_A')}
				</text>
				<text
					x='100'
					y='100'
					fontFamily='Concert One'
					fill='#FFF'
					fontSize='32'
					textAnchor='middle'
					dominantBaseline='middle'
				>
					{dayjs(time).format('ss')}
				</text>
			</svg>
		</div>
	)
}

export default AppleWatchFace
