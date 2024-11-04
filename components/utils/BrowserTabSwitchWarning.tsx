import React, { useEffect } from 'react'

const BrowserTabSwitchWarning = () => {
	useEffect(() => {
		const handleBeforeUnload = (event: Event) => {
			event.preventDefault()
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return <></>
}

export default BrowserTabSwitchWarning
