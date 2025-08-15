import React, { useEffect, useRef, useState } from "react";

interface TimezoneProps {
	tz1: string;
	tz2: string;
}

const SLOT_WIDTH = 80; // px
const HOURS_RANGE = 12; // hours before/after now

const TimezoneComparison: React.FC<TimezoneProps> = ({ tz1, tz2 }) => {
	const [now, setNow] = useState(new Date());
	const scrollRef = useRef<HTMLDivElement>(null);

	// Update using requestAnimationFrame for smooth progress
	useEffect(() => {
		let frame: number;
		const tick = () => {
			setNow(new Date());
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);

	const getHalfHourArray = (tz: string) => {
		const slots: Date[] = [];
		const base = new Date(now.toLocaleString("en-US", { timeZone: tz }));

		for (let i = -HOURS_RANGE * 2; i <= HOURS_RANGE * 2; i++) {
			const date = new Date(base);
			date.setMinutes(base.getMinutes() + i * 30, 0, 0);
			slots.push(date);
		}
		return slots;
	};

	const slots1 = getHalfHourArray(tz1);
	const slots2 = getHalfHourArray(tz2);

	// Find nearest 30-min slot index
	const getHighlightIndex = (slots: Date[], tz: string) => {
		const tzNow = new Date(now.toLocaleString("en-US", { timeZone: tz }));
		let nearestIndex = 0;
		let smallestDiff = Infinity;

		slots.forEach((slot, idx) => {
			const diff = Math.abs(slot.getTime() - tzNow.getTime());
			if (diff < smallestDiff) {
				smallestDiff = diff;
				nearestIndex = idx;
			}
		});

		return nearestIndex;
	};

	const highlightIdx1 = getHighlightIndex(slots1, tz1);
	const highlightIdx2 = getHighlightIndex(slots2, tz2);

	// Scroll so "now" is centered once
	useEffect(() => {
		if (scrollRef.current) {
			const container = scrollRef.current;
			const centerIndex = slots1.length / 2;
			container.scrollLeft =
				centerIndex * SLOT_WIDTH - container.clientWidth / 2;
		}
	}, [slots1.length]);

	// Smooth progress calculations
	const minuteProgress =
		((now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000) /
			3600) *
		100; // % of hour
	const secondProgress =
		((now.getSeconds() * 1000 + now.getMilliseconds()) / 60000) * 100; // % of minute

	return (
		<div
			style={{
				background: "black",
				color: "white",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				position: "relative"
			}}
		>
			{/* Red vertical center line */}
			<div
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: "50%",
					width: "1px",
					background: "red",
					opacity: 0.8,
					transform: "translateX(-50%)",
					zIndex: 10
				}}
			/>

			{/* 30-min scale */}
			<div
				ref={scrollRef}
				style={{
					overflowX: "auto",
					whiteSpace: "nowrap",
					scrollBehavior: "smooth",
				}}
			>
				{/* Timezone 1 */}
				<div style={{ display: "flex", borderBottom: "1px solid #444" }}>
					{slots1.map((date, idx) => {
						const isHighlight = idx === highlightIdx1;
						return (
							<div
								key={idx}
								style={{
									minWidth: `${isHighlight ? SLOT_WIDTH + 20 : SLOT_WIDTH}px`,
									textAlign: "center",
									padding: "8px 0",
									borderRight: "1px solid #333",
									opacity: isHighlight ? 1 : 0.5,
									zIndex: isHighlight ? 5 : 1,
									fontWeight: isHighlight ? "bold" : "normal",
									transition: "all 0.25s ease",
									position: "relative"
								}}
							>
								{date.toLocaleTimeString("en-US", {
									timeZone: tz1,
									hour: "2-digit",
									minute: "2-digit",
									hour12: false
								})}
							</div>
						);
					})}
				</div>

				{/* Timezone 2 */}
				<div style={{ display: "flex" }}>
					{slots2.map((date, idx) => {
						const isHighlight = idx === highlightIdx2;
						return (
							<div
								key={idx}
								style={{
									minWidth: `${isHighlight ? SLOT_WIDTH + 20 : SLOT_WIDTH}px`,
									textAlign: "center",
									padding: "8px 0",
									borderRight: "1px solid #333",
									opacity: isHighlight ? 1 : 0.5,
									zIndex: isHighlight ? 5 : 1,
									fontWeight: isHighlight ? "bold" : "normal",
									transition: "all 0.25s ease",
									position: "relative"
								}}
							>
								{date.toLocaleTimeString("en-US", {
									timeZone: tz2,
									hour: "2-digit",
									minute: "2-digit",
									hour12: false
								})}
							</div>
						);
					})}
				</div>
			</div>

			{/* Progress bars */}
			<div style={{ width: "80%", marginTop: "20px" }}>
				{/* Minute progress */}
				<div
					style={{
						height: "8px",
						background: "#333",
						borderRadius: "4px",
						overflow: "hidden",
						marginBottom: "5px"
					}}
				>
					<div
						style={{
							width: `${minuteProgress}%`,
							background: "lime",
							height: "100%",
							transition: "none"
						}}
					/>
				</div>

				{/* Second progress */}
				<div
					style={{
						height: "4px",
						background: "#333",
						borderRadius: "2px",
						overflow: "hidden"
					}}
				>
					<div
						style={{
							width: `${secondProgress}%`,
							background: "cyan",
							height: "100%",
							transition: "none"
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default TimezoneComparison;
