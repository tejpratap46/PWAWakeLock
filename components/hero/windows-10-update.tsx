import { useState } from 'react'
import Section from '@/components/section'

const Windows10 = () => {

	const [updatePercentage, setUpdatePercentage] = useState(1);

	setInterval(() => {
		setUpdatePercentage(updatePercentage + 1);
	}, 10000);

	return <Section>
		<div className='grid h-screen place-items-center'>
			<h2>Working on updates {updatePercentage}% completed.</h2>
		</div>
	</Section>
}

export default Windows10
