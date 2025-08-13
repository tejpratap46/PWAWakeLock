import React, { useEffect, useRef } from "react";

const MatrixDigitalRain: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		const fontSize = 16;
		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = Array(columns).fill(1);

		const draw = () => {
			// Semi-transparent black background to create trailing effect
			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#0F0"; // Matrix green
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const text = letters.charAt(Math.floor(Math.random() * letters.length));
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 33); // ~30fps

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

export default MatrixDigitalRain;
