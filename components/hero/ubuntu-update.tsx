import React, { useEffect, useState } from "react";

export default function UbuntuUpdate() {
	const [activeDot, setActiveDot] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveDot((prev) => (prev + 1) % 5);
		}, 400);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-[#2c001e] text-white font-sans relative">
			{/* Ubuntu logo */}
			<div className="flex items-center mb-6 text-5xl font-bold tracking-wide">
				ubuntu
				<svg
					className="ml-1 w-6 h-6"
					viewBox="0 0 24 24"
					fill="#dd4814"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1" fill="#dd4814" />
				</svg>
			</div>

			{/* Loading dots */}
			<div className="flex space-x-3 mb-8">
				{[0, 1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className={`w-2 h-2 rounded-full ${
							activeDot === i ? "bg-[#dd4814]" : "bg-white"
						}`}
					></div>
				))}
			</div>

			{/* Footer text */}
			<div className="text-sm text-gray-300 absolute bottom-20 text-center px-4">
				Unattended-upgrade in progress during shutdown, please don&apos;t turn off the computer
			</div>
		</div>
	);
}
