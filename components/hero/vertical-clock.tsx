import React, { useState, useEffect } from 'react'

const VerticalTimeBar = () => {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

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

	const getTransform = (current: number, max: number) => {
		const percentage = (current / max) * 100
		return `translateY(-${percentage}%)`
	}

	return (
		<div className='flex justify-center items-center h-screen overflow-hidden'>
			<div className='flex space-x-4'>
				{[
					{
						values: hours,
						current: time.getHours() % 12 || 12,
						label: 'Hours',
					},
					{ values: minutes, current: time.getMinutes(), label: 'Minutes' },
					{ values: seconds, current: time.getSeconds(), label: 'Seconds' },
				].map(({ values, current, label }) => (
					<div key={label} className='flex flex-col items-center'>
						<div className='rounded-lg h-0' style={{ marginTop: -100 }}>
							<div
								className='transition-transform duration-500 ease-in-out'
								style={{ transform: getTransform(current, values.length) }}
							>
								{values.map((value, index) => (
									<div
										key={index}
										className={`md:h-32 h-8 md:w-64 w-8 p-4 flex items-center justify-center font-lilita md:text-9xl text-2xl ${
											index === current
												? 'text-blue-500 font-bold'
												: 'text-gray-400 font-extralight'
										}`}
									>
										{value}
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