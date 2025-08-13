import React, { useEffect, useState } from "react";

export default function WindowsUpdate() {
	const [progress, setProgress] = useState(2);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) return 100;
				return prev + Math.random() * 2; // slow random progress
			});
		}, 800);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-black text-white w-screen h-screen flex flex-col items-center justify-center font-sans">
			{/* Spinner */}
			<div className="w-10 h-10 border-4 border-gray-500 border-t-white rounded-full animate-spin mb-8"></div>

			{/* Progress Text */}
			<div className="text-center text-lg">
				Working on updates {Math.min(Number(progress.toFixed(0)), 100)}%
				<br />
				<span className="text-gray-400">Please keep your computer on.</span>
			</div>

			{/* Footer text */}
			<div className="absolute bottom-20 text-gray-400 text-sm">
				Your computer may restart a few times.
			</div>
		</div>
	);
}
