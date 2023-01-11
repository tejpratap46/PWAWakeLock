import { useState } from 'react'

const Windows10 = () => {

	const [updatePercentage, setUpdatePercentage] = useState(1);

	setInterval(() => {
		setUpdatePercentage(updatePercentage + 1);
	}, 10000);

	return <div className='grid h-screen place-items-center'>
		<h2>Working on updates {updatePercentage}% completed.</h2>
	</div>
}

export default Windows10
