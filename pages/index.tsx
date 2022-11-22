import Page from '@/components/page'
import Section from '@/components/section'
import { useWakeLock } from 'react-screen-wake-lock'
import { useState } from 'react'
import dayjs from 'dayjs'

const Index = () => {
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

	const { isSupported, released, request, release } = useWakeLock({
		// onRequest: () => alert('Screen Wake Lock: requested!'),
		onError: () => alert('An error happened 💥'),
		onRelease: () => alert('Screen Wake Lock: released!'),
	});

	if (isSupported) {
		request()
	}

	return <Page title={released ? 'Not Aquired' : 'Aquired'}>
		<Section>
			<div className="flex items-center justify-center" style={{height: '70vh'}}>
				<h1>
					<span className='text-9xl'>{currentHr}</span>
					<span className='text-5xl'>h&nbsp;&nbsp;&nbsp;</span>
					<span className='text-9xl'>{currentMinute}</span>
					<span className='text-5xl'>m&nbsp;&nbsp;&nbsp;</span>
					<span className='text-9xl'>{currentSecond}</span>
					<span className='text-5xl'>s</span>
				</h1>
			</div>
		</Section>
	</Page>
}

export default Index
