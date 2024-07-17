import React, { useState, useEffect } from 'react';

const ConcentricRotatingWatchface = () => {
  const [time, setTime] = useState(new Date(0));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const size = 400 * 2;
  const center = size / 2;
  const hourRadius = 70 * 2;
  const minuteRadius = 110 * 2;
  const secondRadius = 150;

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const createRing = (radius, count, value, fontSize) => {
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
  );
};

export default ConcentricRotatingWatchface;