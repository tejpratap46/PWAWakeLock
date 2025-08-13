import React from "react";

interface TimezoneProps {
	tz1: string; // e.g. "Asia/Kolkata"
	tz2: string; // e.g. "America/New_York"
}

const TimezoneComparison: React.FC<TimezoneProps> = ({ tz1, tz2 }) => {
	const now = new Date();

	const getHoursArray = (tz: string) => {
		const hours: string[] = [];
		const base = new Date(now.toLocaleString("en-US", { timeZone: tz }));

		for (let i = -12; i <= 12; i++) {
			const date = new Date(base);
			date.setHours(base.getHours() + i);
			hours.push(
				date.toLocaleTimeString("en-US", {
					timeZone: tz,
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				})
			);
		}
		return hours;
	};

	const hours1 = getHoursArray(tz1);
	const hours2 = getHoursArray(tz2);

	return (
		<div style={{ position: "relative", background: "black", color: "white" }}>
			{/* Red vertical line in center */}
			<div
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: "50%",
					width: "2px",
					background: "red",
					transform: "translateX(-50%)",
					zIndex: 10
				}}
			/>

			<div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
				{/* Timezone 1 */}
				<div style={{ display: "flex", borderBottom: "1px solid #444" }}>
					{hours1.map((h, idx) => (
						<div
							key={idx}
							style={{
								minWidth: "100px",
								textAlign: "center",
								padding: "10px 0",
								borderRight: "1px solid #333"
							}}
						>
							{h}
						</div>
					))}
				</div>

				{/* Timezone 2 */}
				<div style={{ display: "flex" }}>
					{hours2.map((h, idx) => (
						<div
							key={idx}
							style={{
								minWidth: "100px",
								textAlign: "center",
								padding: "10px 0",
								borderRight: "1px solid #333"
							}}
						>
							{h}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimezoneComparison;
