import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, Vector3 } from '@react-three/fiber'
import { Text3D, Center, Float } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
	position: Vector3
	children: React.ReactNode
}

const scale = 10

const ClockDigit = ({ position, children }: Props) => {
	const meshRef = useRef<THREE.Mesh<
		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		THREE.Material | THREE.Material[],
		THREE.Object3DEventMap
	> | null>(null)

	useFrame((state) => {
		meshRef.current!!.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
		meshRef.current!!.rotation.y = Math.cos(state.clock.elapsedTime) * 0.2
	})

	return (
		<Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
			<Center position={position}>
				<Text3D
					ref={meshRef}
					font='https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'
					size={0.5 * scale}
					height={0.2 * scale}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02 * scale}
					bevelSize={0.02 * scale}
					bevelOffset={0}
					bevelSegments={5}
				>
					{children}
					<meshNormalMaterial />
				</Text3D>
			</Center>
		</Float>
	)
}

const DigitalClock = () => {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const hours = time.getHours().toString().padStart(2, '0')
	const minutes = time.getMinutes().toString().padStart(2, '0')
	const seconds = time.getSeconds().toString().padStart(2, '0')

	return (
		<Canvas camera={{ position: [0, 0, 5] }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<ClockDigit position={[-2.5 * scale, 0, 0]}>{hours[0]}</ClockDigit>
			<ClockDigit position={[-1.5 * scale, 0, 0]}>{hours[1]}</ClockDigit>
			<ClockDigit position={[-0.5 * scale, 0, 0]}>:</ClockDigit>
			<ClockDigit position={[0.5 * scale, 0, 0]}>{minutes[0]}</ClockDigit>
			<ClockDigit position={[1.5 * scale, 0, 0]}>{minutes[1]}</ClockDigit>
			<ClockDigit position={[2.5 * scale, 0, 0]}>:</ClockDigit>
			<ClockDigit position={[3.5 * scale, 0, 0]}>{seconds[0]}</ClockDigit>
			<ClockDigit position={[4.5 * scale, 0, 0]}>{seconds[1]}</ClockDigit>
		</Canvas>
	)
}

export default DigitalClock
