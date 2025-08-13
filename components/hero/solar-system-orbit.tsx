import React, { useEffect, useRef } from 'react'

interface Planet {
	radius: number
	distance: number
	speed: number
	angle: number
	color: string
	hasRings?: boolean
	moons?: Moon[]
}

interface Moon {
	radius: number
	distance: number
	speed: number
	angle: number
	color: string
}

interface Star {
	x: number
	y: number
	size: number
	opacity: number
	blinkSpeed: number
	driftX: number
	driftY: number
}

const SolarSystemOrbit: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		// Random background stars
		const stars: Star[] = Array.from({ length: 150 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 1.5,
			opacity: Math.random() * 0.8 + 0.2,
			blinkSpeed: Math.random() * 0.02 + 0.005,
			driftX: (Math.random() - 0.5) * 0.05,
			driftY: (Math.random() - 0.5) * 0.05,
		}))

		const planets: Planet[] = [
			{ radius: 5, distance: 50, speed: 0.02, angle: 0, color: 'gray' },
			{
				radius: 8,
				distance: 100,
				speed: 0.015,
				angle: 0,
				color: 'orange',
				moons: [
					{
						radius: 2,
						distance: 15,
						speed: 0.05,
						angle: 0,
						color: 'lightgray',
					},
				],
			},
			{ radius: 10, distance: 160, speed: 0.012, angle: 0, color: 'blue' },
			{
				radius: 7,
				distance: 220,
				speed: 0.009,
				angle: 0,
				color: 'red',
				hasRings: true, // 4th planet gets rings
			},
			{ radius: 3, distance: 320, speed: 0.005, angle: 0, color: 'pink' },
		]

		const drawBackground = () => {
			ctx.fillStyle = 'black'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			stars.forEach((star) => {
				star.opacity += star.blinkSpeed
				if (star.opacity > 1 || star.opacity < 0.2) {
					star.blinkSpeed *= -1
				}

				star.x += star.driftX
				star.y += star.driftY

				if (star.x < 0) star.x = canvas.width
				if (star.x > canvas.width) star.x = 0
				if (star.y < 0) star.y = canvas.height
				if (star.y > canvas.height) star.y = 0

				ctx.beginPath()
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255,255,255,${star.opacity})`
				ctx.fill()
			})
		}

		let ringRotation = 0

		const draw = () => {
			drawBackground()

			const centerX = canvas.width / 2
			const centerY = canvas.height / 2

			// Sun
			ctx.beginPath()
			ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
			ctx.fillStyle = 'yellow'
			ctx.fill()

			planets.forEach((planet) => {
				planet.angle += planet.speed
				const planetX = centerX + planet.distance * Math.cos(planet.angle)
				const planetY = centerY + planet.distance * Math.sin(planet.angle)

				// Orbit path
				ctx.beginPath()
				ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2)
				ctx.strokeStyle = 'rgba(255,255,255,0.1)'
				ctx.stroke()

				// Planet
				ctx.beginPath()
				ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2)
				ctx.fillStyle = planet.color
				ctx.fill()

				// Rings
				if (planet.hasRings) {
					ctx.save()
					ctx.translate(planetX, planetY)
					ctx.rotate(ringRotation)
					ctx.beginPath()
					ctx.ellipse(
						0,
						0,
						planet.radius * 2,
						planet.radius * 0.7,
						0,
						0,
						Math.PI * 2,
					)
					ctx.strokeStyle = 'rgba(200,200,200,0.6)'
					ctx.lineWidth = 2
					ctx.stroke()
					ctx.restore()

					ringRotation += 0.002 // slow ring rotation
				}

				// Moons
				if (planet.moons) {
					planet.moons.forEach((moon) => {
						moon.angle += moon.speed
						const moonX = planetX + moon.distance * Math.cos(moon.angle)
						const moonY = planetY + moon.distance * Math.sin(moon.angle)

						ctx.beginPath()
						ctx.arc(planetX, planetY, moon.distance, 0, Math.PI * 2)
						ctx.strokeStyle = 'rgba(255,255,255,0.05)'
						ctx.stroke()

						ctx.beginPath()
						ctx.arc(moonX, moonY, moon.radius, 0, Math.PI * 2)
						ctx.fillStyle = moon.color
						ctx.fill()
					})
				}
			})

			requestAnimationFrame(draw)
		}

		draw()

		const handleResize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return <canvas ref={canvasRef} className='block w-full h-full bg-black' />
}

export default SolarSystemOrbit
