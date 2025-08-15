import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

const AnalogClock: React.FC = () => {
	const [time, setTime] = useState(new Date());
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		// Use requestAnimationFrame for smooth motion (uses ms fraction).
		const tick = () => {
			setTime(new Date());
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);

		return () => {
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	// fractional values for smooth positions
	const milliseconds = time.getMilliseconds();
	const seconds = time.getSeconds() + milliseconds / 1000;
	const minutes = time.getMinutes() + seconds / 60;
	const hours = (time.getHours() % 12) + minutes / 60;

	// correct angles (no -90 offset). 360/60 = 6°, 360/12 = 30°
	const secondsAngle = seconds * 6;
	const minutesAngle = minutes * 6;
	const hoursAngle = hours * 30;

	const hourMarkers = Array.from({ length: 12 }, (_, i) => {
		const angle = (i * 30) * (Math.PI / 180);
		const x1 = 150 + Math.cos(angle) * 120;
		const y1 = 150 + Math.sin(angle) * 120;
		const x2 = 150 + Math.cos(angle) * 130;
		const y2 = 150 + Math.sin(angle) * 130;
		return { x1, y1, x2, y2 };
	});

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-black">
			<div className="relative w-full h-full max-w-[600px] max-h-[600px] aspect-square flex items-center justify-center">
				<svg viewBox="0 0 300 300" className="w-full h-full">
					{/* Outer ring */}
					<circle cx="150" cy="150" r="145" fill="none" stroke="#374151" strokeWidth="2" />
					<circle cx="150" cy="150" r="130" fill="none" stroke="#4b5563" strokeWidth="4" />
					<circle cx="150" cy="150" r="110" fill="none" stroke="#6b7280" strokeWidth="3" />
					<circle cx="150" cy="150" r="90" fill="none" stroke="#9ca3af" strokeWidth="2" />
					{hourMarkers.map((marker, index) => (
						<line
							key={index}
							x1={marker.x1}
							y1={marker.y1}
							x2={marker.x2}
							y2={marker.y2}
							stroke="#f3f4f6"
							strokeWidth="3"
							strokeLinecap="round"
						/>
					))}

					{/* Hour, minute, second hands - rotation is relative to the line's current orientation (pointing up) */}
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="80"
						stroke="#e5e7eb"
						strokeWidth="6"
						strokeLinecap="round"
						transform={`rotate(${hoursAngle} 150 150)`}
					/>
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="60"
						stroke="#d1d5db"
						strokeWidth="4"
						strokeLinecap="round"
						transform={`rotate(${minutesAngle} 150 150)`}
					/>
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="50"
						stroke="#f87171"
						strokeWidth="2"
						strokeLinecap="round"
						transform={`rotate(${secondsAngle} 150 150)`}
					/>
					<circle cx="150" cy="150" r="8" fill="#f3f4f6" />
				</svg>

				<div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-full shadow-lg border border-gray-700">
					<p className="text-gray-100 font-mono text-5xl">
						{dayjs(time).format('hh:mm:ss')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AnalogClock;
