import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Clock() {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	return (
		<div
			className='text-center py-2 text-4xl font-semibold text-zinc-800 dark:text-zinc-200'
			style={{
				fontFamily: 'Concert One',
			}}
		>
			{dayjs(time).format('hh:mm A')}
		</div>
	)
}
