import { useState } from 'react'
import Section from '@/components/section'
import dayjs from 'dayjs'
import { ToWords } from 'to-words';

const WordClock = () => {
	const toWords = new ToWords();

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

	return <Section>
		<div className='grid h-screen place-items-center' style={{ height: '70vh' }}>
			<div style={{ width: 500, height: 500, overflow: 'hidden' }}>
				<h1 className="text-6xl">
					<span className='text-gray-400 dark:text-gray-700'>LOIIN</span>
					<span>IT</span>
					<span className='text-gray-400 dark:text-gray-700'>LAS</span>
					<span>IS</span>
					<span className='text-gray-400 dark:text-gray-700'>LAJDBA</span>
				</h1>
				<h1 className="text-6xl mt-4">
					<span className='text-gray-400 dark:text-gray-700'>WQEIT</span>
					<span>{toWords.convert(parseInt(currentMinute)).split(' ').join('L')}</span>
					<span className='text-gray-400 dark:text-gray-700'>AWLKH</span>
				</h1>
				<h1 className="text-6xl mt-4">
					<span>PAST</span>
					<span className='text-gray-400 dark:text-gray-700'>WQEIT</span>
					<span className='text-gray-400 dark:text-gray-700'>AWLKH</span>
				</h1>
				<h1 className="text-6xl">
					<span className='text-gray-400 dark:text-gray-700'>WQEIT</span>
					<span>{toWords.convert(parseInt(currentHr))}</span>
					<span className='text-gray-400 dark:text-gray-700'>AWLKH</span>
				</h1>
				<h1 className="text-6xl mt-4">
					<span className='text-gray-400 dark:text-gray-700'>QE</span>
					{toWords.convert(parseInt(currentSecond))}
					<span className='text-gray-400 dark:text-gray-700'>WT</span>
				</h1>
			</div>
		</div>
	</Section>
}

export default WordClock
