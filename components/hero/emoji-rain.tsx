import React, { useEffect, useRef } from "react";

const EmojiRain: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const emojis = ["🍕", "🚀", "🐱", "🌸", "💎", "🎵", "🔥", "⚡", "🌈", "🍩"];
		const fontSize = 32;
		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = Array(columns).fill(1);

		const draw = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px serif`;

			for (let i = 0; i < drops.length; i++) {
				const emoji = emojis[Math.floor(Math.random() * emojis.length)];
				ctx.fillText(emoji, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 50);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} className="block w-full h-full bg-black" />;
};

export default EmojiRain;
