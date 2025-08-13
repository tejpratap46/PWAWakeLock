import React, { useEffect, useState } from "react";

export default function Windows10Update() {
	const [progress, setProgress] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) return 100;
				return prev + Math.random() * 2; // slow increment
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-screen h-screen bg-[#0078d7] text-white flex flex-col items-center justify-center font-sans relative">
			{/* Spinner */}
			<div className="relative w-12 h-12 mb-8">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-white rounded-full"
						style={{
							top: "50%",
							left: "50%",
							transform: `rotate(${i * 60}deg) translate(20px)`,
							animation: `spinDots 1s linear infinite`,
							animationDelay: `${i * 0.1}s`
						}}
					></div>
				))}
			</div>

			{/* Update text */}
			<div className="text-center text-lg leading-relaxed">
				Working on updates {Math.min(Number(progress.toFixed(0)), 100)}% complete.
				<br />
				Don’t turn off your PC. This will take a while.
			</div>

			{/* Bottom text */}
			<div className="absolute bottom-20 text-sm text-white/80">
				Your PC may restart several times
			</div>

			{/* Animation keyframes */}
			<style>{`
        @keyframes spinDots {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
		</div>
	);
}
