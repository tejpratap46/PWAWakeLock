import React from "react"

type Shortcut = {
	keys: string[]
	description: string
}

export const shortcuts: Shortcut[] = [
	{
		keys: ["h"],
		description: "Goto Home Screen",
	},
	{
		keys: ["f"],
		description: "Toggle Full Screen",
	},
	{
		keys: ["Ctrl + k", "Cmd + k"],
		description: "Ensure elements with ARIA can be activated with both key commands.",
	},
	{
		keys: ["←", "→"],
		description: "Choose and activate previous/next screen saver.",
	},
]

const KeyboardShortcuts: React.FC = () => {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
				<thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
				<tr>
					<th scope="col" className="px-6 py-3">Key</th>
					<th scope="col" className="px-6 py-3">Description</th>
				</tr>
				</thead>
				<tbody>
				{shortcuts.map((s, idx) => (
					<tr
						key={idx}
						className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-700 last:border-0"
					>
						<th
							scope="row"
							className="px-6 py-4 font-medium text-zinc-500 whitespace-nowrap dark:text-zinc-400"
						>
							{s.keys.map((key, i) => (
								<React.Fragment key={i}>
									<kbd className="px-2 py-1.5 text-xs font-semibold text-zinc-800
                      bg-zinc-100 border border-zinc-200 rounded-lg
                      dark:bg-zinc-600 dark:text-zinc-100 dark:border-zinc-500">
										{key}
									</kbd>
									{i < s.keys.length - 1 && <span className="mx-2">or</span>}
								</React.Fragment>
							))}
						</th>
						<td className="px-6 py-4">{s.description}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default KeyboardShortcuts
