'use client'
import React, { useEffect, useRef, useState } from 'react'

type MinuteProgressProps = {
	height?: number // px
	rounded?: boolean // rounded corners
	showSeconds?: boolean // show numeric seconds label
	decimals?: number // how many decimals in the seconds label
	className?: string // extra className for container
	trackColor?: string // CSS color for track
	fillColor?: string // CSS color for progress fill
}

function nowFractionOfMinute() {
	const ms = Date.now()
	const fraction = (ms % 60000) / 60000 // 0..1 within current minute
	const seconds = fraction * 60 // 0..60
	return { fraction, seconds }
}

const MinuteProgress: React.FC<MinuteProgressProps> = ({
	height = 12,
	rounded = true,
	showSeconds = true,
	decimals = 1,
	className = '',
	trackColor = 'rgba(0,0,0,0.12)',
	fillColor = 'linear-gradient(90deg, rgba(99,102,241,1), rgba(59,130,246,1))',
}) => {
	const [progress, setProgress] = useState(() => nowFractionOfMinute())
	const rafId = useRef<number | null>(null)

	useEffect(() => {
		let running = true

		const loop = () => {
			if (!running) return
			setProgress(nowFractionOfMinute())
			rafId.current = requestAnimationFrame(loop)
		}

		// Start immediately so the first paint is accurate.
		rafId.current = requestAnimationFrame(loop)

		return () => {
			running = false
			if (rafId.current !== null) cancelAnimationFrame(rafId.current)
		}
	}, [])

	// Reduced motion: if user prefers reduced motion, update only ~10x/sec
	useEffect(() => {
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (!mql.matches) return

		if (rafId.current !== null) cancelAnimationFrame(rafId.current)
		let timer: number | null = null

		const tick = () => {
			setProgress(nowFractionOfMinute())
			timer = window.setTimeout(tick, 100) // ~10 fps
		}
		tick()

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [])

	const percent = progress.fraction * 100
	const secondsLabel = progress.seconds.toFixed(decimals)

	const containerStyle: React.CSSProperties = {
		height,
		background: trackColor,
		borderRadius: rounded ? height / 2 : 0,
		position: 'relative',
		overflow: 'hidden',
	}

	const fillStyle: React.CSSProperties = {
		width: `${percent}%`,
		height: '100%',
		background: fillColor,
		// No CSS transition; smoothness comes from rAF-driven updates.
	}

	const labelStyle: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontVariantNumeric: 'tabular-nums',
		fontSize: Math.max(12, Math.floor(height * 0.9)),
		lineHeight: 1,
		color: '#0b0b0b',
		mixBlendMode: 'screen', // keeps label readable on gradient
		pointerEvents: 'none',
		userSelect: 'none',
	}

	return (
		<div
			role='progressbar'
			aria-label='Current minute progress'
			aria-valuemin={0}
			aria-valuemax={60}
			aria-valuenow={+secondsLabel}
			aria-valuetext={`${secondsLabel} seconds`}
			className={className}
			style={containerStyle}
		>
			<div style={fillStyle} />
			{showSeconds && <div style={labelStyle}>{secondsLabel}s</div>}
		</div>
	)
}

export default MinuteProgress
