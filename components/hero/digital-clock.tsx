import { useState } from 'react'
import Section from '@/components/section'
import dayjs from 'dayjs'

const DigitalClock = () => {
	const hrFormat = 'hh';
	const minuteFormat = 'mm';
	const secondFormat = 'ss';

	const [currentHr, setCurrentHr] = useState(dayjs().format(hrFormat));
	const [currentMinute, setCurrentMinute] = useState(dayjs().format(minuteFormat));
	const [currentSecond, setCurrentSecond] = useState(dayjs().format(secondFormat));

	setInterval(() => {
		setCurrentHr(dayjs().format(hrFormat));
		setCurrentMinute(dayjs().format(minuteFormat));
		setCurrentSecond(dayjs().format(secondFormat));
	}, 1000);

	return <div className='grid h-screen place-items-center' style={{ height: '70vh' }}>
		<h1>
			<span className='text-9xl'>{currentHr}</span>
			<span className='text-5xl'>h&nbsp;&nbsp;&nbsp;</span>
			<span className='text-9xl'>{currentMinute}</span>
			<span className='text-5xl'>m&nbsp;&nbsp;&nbsp;</span>
			<span className='text-9xl'>{currentSecond}</span>
			<span className='text-5xl'>s</span>
		</h1>
	</div>
}

export default DigitalClock
