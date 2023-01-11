import { useState } from 'react'
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const Globe = (props: GlobeProps) => {

	const { lat, long } = props

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [location, setLocation] = useState<[number, number]>([lat || 0, long || 0])

	// useEffect(() => {
		// if (lat && long) {
			// setLocation([lat!, long!])
		// } else {
		// 	navigator.geolocation.getCurrentPosition((location) => {
		// 		setLocation([location.coords.longitude, location.coords.latitude])
		// 	});
		// }
	// }, [lat, long])

	useEffect(() => {
		let phi = 0;

		const globe = createGlobe(canvasRef!.current!, {
			devicePixelRatio: 2,
			width: 600 * 2,
			height: 600 * 2,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: [0.1, 0.8, 1],
			glowColor: [1, 1, 1],
			markers: [
				// longitude latitude
				{ location: location, size: 0.05 }
			],
			onRender: (state) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.
				state.phi = phi;
				phi += 0.01;
			}
		});

		return () => {
			globe.destroy();
		};
	}, [location]);

	return <div className='grid h-screen place-items-center'>
		<canvas onClick={() => {
			console.log(location, props);

		}}
			ref={canvasRef}
			style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: "1" }}
		/>
	</div>
}

export default Globe

interface GlobeProps {
	lat?: number,
	long?: number
}
