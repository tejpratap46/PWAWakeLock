import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'

const AnalogClock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Calculate angles for clock hands
	const secondsAngle = (time.getSeconds() * 6) - 90; // 6 degrees per second
	const minutesAngle = (time.getMinutes() * 6 + time.getSeconds() * 0.1) - 90; // 6 degrees per minute
	const hoursAngle = (time.getHours() * 30 + time.getMinutes() * 0.5) - 90; // 30 degrees per hour

	// Create hour markers
	const hourMarkers = Array.from({ length: 12 }, (_, i) => {
		const angle = (i * 30) * (Math.PI / 180);
		const x1 = 150 + Math.cos(angle) * 120;
		const y1 = 150 + Math.sin(angle) * 120;
		const x2 = 150 + Math.cos(angle) * 130;
		const y2 = 150 + Math.sin(angle) * 130;
		return { x1, y1, x2, y2 };
	});

	return (
		<div className="m-auto p-4 justify-center items-center h-screen w-1/2">
			<div className="relative aspect-square">
				<svg viewBox="0 0 300 300" className="w-full h-full">
					{/* Outer ring */}
					<circle
						cx="150"
						cy="150"
						r="145"
						fill="none"
						stroke="#e2e8f0"
						strokeWidth="2"
						className="transition-all duration-300 hover:stroke-blue-200"
					/>

					{/* Hour ring */}
					<circle
						cx="150"
						cy="150"
						r="130"
						fill="none"
						stroke="#cbd5e1"
						strokeWidth="4"
					/>

					{/* Minute ring */}
					<circle
						cx="150"
						cy="150"
						r="110"
						fill="none"
						stroke="#94a3b8"
						strokeWidth="3"
					/>

					{/* Second ring */}
					<circle
						cx="150"
						cy="150"
						r="90"
						fill="none"
						stroke="#64748b"
						strokeWidth="2"
					/>

					{/* Hour markers */}
					{hourMarkers.map((marker, index) => (
						<line
							key={index}
							x1={marker.x1}
							y1={marker.y1}
							x2={marker.x2}
							y2={marker.y2}
							stroke="#475569"
							strokeWidth="3"
							strokeLinecap="round"
						/>
					))}

					{/* Hour hand */}
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="80"
						stroke="#1e293b"
						strokeWidth="6"
						strokeLinecap="round"
						transform={`rotate(${hoursAngle} 150 150)`}
						className="transition-transform duration-300"
					/>

					{/* Minute hand */}
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="60"
						stroke="#334155"
						strokeWidth="4"
						strokeLinecap="round"
						transform={`rotate(${minutesAngle} 150 150)`}
						className="transition-transform duration-200"
					/>

					{/* Second hand */}
					<line
						x1="150"
						y1="150"
						x2="150"
						y2="50"
						stroke="#dc2626"
						strokeWidth="2"
						strokeLinecap="round"
						transform={`rotate(${secondsAngle} 150 150)`}
						className="transition-transform duration-100"
					/>

					{/* Center dot */}
					<circle
						cx="150"
						cy="150"
						r="8"
						fill="#1e293b"
					/>
				</svg>

				{/* Digital time display */}
				<div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-lg">
					<p className="text-slate-700 font-mono text-5xl">
						{dayjs(time).format('hh:mm:ss')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AnalogClock;
