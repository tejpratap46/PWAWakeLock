import { useState } from 'react'
import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

const Globe = (props: GlobeProps) => {
	const { lat, long, isAquired } = props

	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [location, setLocation] = useState<[number, number]>([lat, long])

	useEffect(() => {
		if (lat && long) {
			setLocation([lat!, long!])
		} else {
			navigator.geolocation.getCurrentPosition((location) => {
				setLocation([location.coords.latitude, location.coords.longitude])
			})
		}
	}, [lat, long])

	const height = 800

	useEffect(() => {
		let phi = 0

		const globe = createGlobe(canvasRef!.current!, {
			devicePixelRatio: 2,
			width: height * 2,
			height: height * 2,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 100000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			opacity: 0.7,
			markerColor: [0.1, 0.8, 1],
			glowColor: [1, 1, 1],
			markers: [
				// longitude latitude
				{ location: location, size: 0.05 },
			],
			onRender: (state) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.
				state.phi = phi
				phi += 0.01
			},
		})

		return () => {
			globe.destroy()
		}
	}, [location])

	return (
		<div className='grid h-screen place-items-center'>
			<canvas
				onClick={() => {
					console.log(location, props)
				}}
				ref={canvasRef}
				style={{
					width: height,
					height: height,
					maxWidth: '100%',
					aspectRatio: '1',
				}}
			/>
		</div>
	)
}

export default Globe

interface GlobeProps {
	isAquired: boolean
	lat: number
	long: number
}
