import {
	KBarAnimator,
	KBarPortal,
	KBarPositioner,
	KBarResults,
	KBarSearch,
	useMatches,
} from 'kbar'
import Clock from '@/components/search/Clock'
import React from 'react'
import MinuteProgress from '@/components/search/MinuteProgress'

export default function CommandPalette() {
	const { results } = useMatches()

	return (
		<KBarPortal>
			<KBarPositioner className='fixed inset-0 bg-black/50'>
				<KBarAnimator className='bg-white dark:bg-zinc-800 w-full max-w-lg mx-auto mt-20 rounded-lg shadow-lg'>
					<Clock />
					<MinuteProgress height={4} rounded decimals={2} />
					<KBarSearch
						className='w-full p-4 text-lg bg-transparent outline-none'
						placeholder='Type a command...'
					/>
					<KBarResults
						onRender={({ item, active }) => {
							if (typeof item === "string") {
								// Separator styling
								return (
									<div className="px-2 py-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400" style={{
										fontFamily: "Kode Mono",
										fontWeight: "bold",
									}}>
										{item}
									</div>
								)
							}

							// Normal item styling
							return (
								<div
									className={`p-2 cursor-pointer rounded-lg ${
										active ? "bg-zinc-200 dark:bg-zinc-700" : ""
									}`}
								>
									{item.name}
								</div>
							)
						}}
						items={results}
					/>
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	)
}
