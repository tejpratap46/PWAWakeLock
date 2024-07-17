import React, { useState, useEffect } from 'react';

const ConcentricRotatingWatchface = () => {
    const [time, setTime] = useState(new Date(0));

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const size: number = 400 * 2;
    const center: number = size / 2;
    const hourRadius: number = 70 * 2;
    const minuteRadius: number = 110 * 2;
    const secondRadius: number = 150 * 2;

    const hours: number = time.getHours() % 12;
    const minutes: number = time.getMinutes();
    const seconds: number = time.getSeconds();

    const createRing = (radius: number, count: number, value: number, fontSize: number) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const angle = (i * (360 / count) - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            items.push(
                <text
                    key={i}
                    x={x}
                    y={y}
                    fill={i === value ? "#ff0000" : "#ffffff"}
                    fontSize={fontSize}
                    fontWeight={i === value ? "bold" : "normal"}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    transform={`rotate(${i * (360 / count)}, ${x}, ${y})`}
                >
                    {i.toString().padStart(2, '0')}
                </text>
            );
        }
        return items;
    };

    return (
        <div className="h-full w-full content-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform: 'rotate(90deg)'}}>
                <circle cx={center} cy={center} r={secondRadius + 20} fill="#000000" />

                {/* Hour ring */}
                <g transform={`rotate(${-hours * 30}, ${center}, ${center})`}>
                    {createRing(hourRadius, 12, hours, 24)}
                </g>

                {/* Minute ring */}
                <g transform={`rotate(${-minutes * 6}, ${center}, ${center})`}>
                    {createRing(minuteRadius, 60, minutes, 16)}
                </g>

                {/* Second ring */}
                <g transform={`rotate(${-seconds * 6}, ${center}, ${center})`}>
                    {createRing(secondRadius, 60, seconds, 12)}
                </g>

                {/* Center dot */}
                <circle cx={center} cy={center} r={5} fill="#ffffff" />
            </svg>
        </div>
    );
};

export default ConcentricRotatingWatchface;