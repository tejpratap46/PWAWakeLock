import { useState, useEffect } from 'react'

const DigitalClock = () => {
	const [time, setTime] = useState(new Date(0))

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const padNumber = (num: number) => num.toString().padStart(2, '0')

	return (
		<div
			className='grid h-screen place-items-center'
			style={{ height: '70vh' }}
		>
			<h1 className='font-lilita'>
				<span className='w-40 text-9xl inline-block'>
					{padNumber(time.getHours() % 12 || 12)}
				</span>
				<span className='text-5xl inline-block'>h&nbsp;&nbsp;&nbsp;</span>
				<span className='w-40 text-9xl inline-block'>
					{padNumber(time.getMinutes())}
				</span>
				<span className='text-5xl inline-block'>m&nbsp;&nbsp;&nbsp;</span>
				<span className='w-40 text-9xl inline-block'>
					{padNumber(time.getSeconds())}
				</span>
				<span className='text-5xl inline-block'>s</span>
			</h1>
		</div>
	)
}

export default DigitalClock
