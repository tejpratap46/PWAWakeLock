import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import NumberFlow from '@number-flow/react'

const DigitalClock = () => {
	const [time, setTime] = useState(new Date(0))
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const padNumber = (num: number) => parseInt(num.toString().padStart(2, '0'))

	return (
		<div
			className='grid h-screen place-items-center'
			style={{ height: '70vh' }}
		>
			<div>
				<h1 className='font-lilita'>
					{/* <span className='w-40 text-9xl inline-block'>
					{padNumber(time.getHours() % 12 || 12)}
				</span> */}
					<NumberFlow
						className='w-40 text-9xl text-right inline-block'
						value={padNumber(time.getHours() % 12 || 12)}
						format={{ notation: 'compact' }} // Intl.NumberFormat options
						locales="en-US" // Intl.NumberFormat locales
					/>
					<span className='text-5xl inline-block'>h&nbsp;&nbsp;&nbsp;</span>
					{/* <span className='w-40 text-9xl inline-block'>
						{padNumber(time.getMinutes())}
					</span> */}
					<NumberFlow
						className='w-40 text-9xl text-right inline-block'
						value={padNumber(time.getMinutes())}
						format={{ notation: 'compact' }} // Intl.NumberFormat options
						locales="en-US" // Intl.NumberFormat locales
					/>
					<span className='text-5xl inline-block'>m&nbsp;&nbsp;&nbsp;</span>
					{/* <span className='w-40 text-9xl inline-block'>
						{padNumber(time.getSeconds())}
					</span> */}
					<NumberFlow
						className='w-40 text-9xl text-right inline-block'
						value={padNumber(time.getSeconds())}
						format={{ notation: 'compact' }} // Intl.NumberFormat options
						locales="en-US" // Intl.NumberFormat locales
					/>
					<span className='text-5xl inline-block'>s</span>
				</h1>
				<p className='text-center text-4xl font-righteous dark:text-gray-400 text-gray-700'>
					{dayjs().format('DD MMMM')}
				</p>
			</div>
		</div>
	)
}

export default DigitalClock
