import React, { useState, useEffect } from 'react'

const VerticalTimeBar = () => {
	const [time, setTime] = useState(new Date(0))
	const [animatedTick, setAnimatedTick] = useState(1)
	const [shouldStartClock, setShouldStartClock] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			time.setSeconds(time.getSeconds() + animatedTick)
			time.setMinutes(time.getSeconds() + animatedTick)
			if (animatedTick % 2 == 0) {
				time.setHours(time.getSeconds() + (animatedTick / 2))
			}

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

	const padNumber = (num: number) => num.toString().padStart(2, '0')

	const createNumberArray = (max: number) => {
		return Array.from({ length: max }, (_, i) => padNumber(i))
	}

	const createHourArray = (max: number) => {
		return Array.from({ length: max }, (_, i) => padNumber(i || 12))
	}

	const hours = createHourArray(12)
	const minutes = createNumberArray(60)
	const seconds = createNumberArray(60)
	const midnight = createNumberArray(2)

	const getTransform = (current: number, max: number) => {
		const percentage = (current / max) * 100
		return `translateY(-${percentage}%)`
	}

	const mapToValue = (label: string, value: string) => {
		switch (label) {
			case 'MidNight':
				return parseInt(value) == 0 ? 'am' : 'pm'
			default:
				return value
		}
	}

	return (
		<div className='flex justify-center items-center h-screen overflow-hidden'>
			<div className='flex space-x-4'>
				{[
					{
						values: hours,
						current: time.getHours() % 12,
						label: 'Hours',
					},
					{ values: minutes, current: time.getMinutes(), label: 'Minutes' },
					{ values: seconds, current: time.getSeconds(), label: 'Seconds' },
					{
						values: midnight,
						current: time.getHours() < 12 ? 0 : 1,
						label: 'MidNight',
					},
				].map(({ values, current, label }) => (
					<div key={label} className='flex flex-col items-center'>
						<div className='rounded-lg h-0' style={{ marginTop: -100 }}>
							<div
								className='transition-transform duration-500 ease-in-out'
								style={{ transform: getTransform(current, values.length) }}
							>
								{values.map((value, index) => (
									<div
										key={`${label}${index}`}
										className={`md:h-32 h-16 md:w-64 w-16 p-4 flex items-center justify-center font-lilita md:text-9xl text-4xl ${
											index === current
												? 'text-blue-500 font-bold'
												: 'text-gray-400 font-extralight'
										}`}
									>
										{mapToValue(label, value)}
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default VerticalTimeBar
