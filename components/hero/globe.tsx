import { useState } from 'react'
import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

const Globe = (props: GlobeProps) => {
	const { lat, long } = props

	const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

	const pointerInteracting = useRef<number | null>(null)
	const pointerInteractionMovement = useRef(0)
	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}))

	const height = 800

	useEffect(() => {
		let phi = 0
		let width = 0
		const onResize = () =>
			canvasRef.current && (width = canvasRef.current.offsetWidth)
		window.addEventListener('resize', onResize)
		onResize()

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
				// This prevents rotation while dragging
				if (!pointerInteracting.current) {
					// Called on every animation frame.
					// `state` will be an empty object, return updated params.
					phi += 0.005
				}
				state.phi = phi + r.get()
				state.width = width * 2
				state.height = width * 2
			},
		})

		return () => {
			globe.destroy()
			window.removeEventListener('resize', onResize)
		}
	})

	return (
		<div className='grid h-screen place-items-center'>
			<canvas
				onPointerDown={(e) => {
					pointerInteracting.current =
						e.clientX - pointerInteractionMovement.current
					canvasRef!.current!.style.cursor = 'grabbing'
				}}
				onPointerUp={() => {
					pointerInteracting.current = null
					canvasRef!.current!.style.cursor = 'grab'
				}}
				onPointerOut={() => {
					pointerInteracting.current = null
					canvasRef!.current!.style.cursor = 'grab'
				}}
				onMouseMove={(e) => {
					if (pointerInteracting.current !== null) {
						const delta = e.clientX - pointerInteracting.current
						pointerInteractionMovement.current = delta
						api.start({
							r: delta / 200,
						})
					}
				}}
				onTouchMove={(e) => {
					if (pointerInteracting.current !== null && e.touches[0]) {
						const delta = e.touches[0].clientX - pointerInteracting.current
						pointerInteractionMovement.current = delta
						api.start({
							r: delta / 100,
						})
					}
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
	lat: number
	long: number
}
