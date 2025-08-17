import React from 'react'
import { Book, Code2, FileText, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import KeyboardShortcuts from '@/components/home/KeyboardShortcuts'

type PageLink = {
	name: string
	url: string
	icon: React.ReactNode
	description?: string
}

type Category = {
	title: string
	pages: PageLink[]
}

export const categories: Category[] = [
	{
		title: 'Awesome',
		pages: [
			{
				name: 'Solar',
				url: '/solar',
				icon: <FileText size={18} />,
				description: 'Solar System',
			},
			{
				name: 'Weather',
				url: '/weather',
				icon: <Code2 size={18} />,
				description: 'Weather in your city',
			},
			{
				name: 'Matrix',
				url: '/matrix',
				icon: <Code2 size={18} />,
				description: 'Matrix Rain',
			},
			{
				name: 'Globe',
				url: '/globe',
				icon: <Code2 size={18} />,
				description: 'Rotating Globe with grab',
			},
			{
				name: 'Emoji',
				url: '/emoji',
				icon: <Code2 size={18} />,
				description: 'Emoji Rain',
			},
		],
	},
	{
		title: 'Clocks',
		pages: [
			{
				name: 'Digital',
				url: '/digital',
				icon: <Book size={18} />,
				description: 'Digital clock with animation',
			},
			{
				name: 'Analog',
				url: '/analog',
				icon: <PlayCircle size={18} />,
				description: 'Analog Clock',
			},
			{
				name: 'Apple Watch',
				url: '/apple',
				icon: <PlayCircle size={18} />,
				description: 'Apple Rings Clock',
			},
			{
				name: 'Pixel Watch',
				url: '/pw',
				icon: <PlayCircle size={18} />,
				description: 'Pixel Watch Inspired Clock',
			},
			{
				name: 'Shadow Clock',
				url: '/shadow',
				icon: <PlayCircle size={18} />,
				description: 'A Shadow/Dark clock, which can only be read in night',
			},
			{
				name: 'Timezone',
				url: '/timezone',
				icon: <PlayCircle size={18} />,
				description: '2 Timezones running together',
			},
			{
				name: 'Word',
				url: '/word',
				icon: <PlayCircle size={18} />,
				description: 'Word clock',
			},
			{
				name: 'World',
				url: '/world',
				icon: <PlayCircle size={18} />,
				description: 'World clock',
			},
		],
	},
	{
		title: 'Fake Update',
		pages: [
			{
				name: 'Win11',
				url: '/win11',
				icon: <FileText size={18} />,
				description: 'Windows 11 update screen',
			},
			{
				name: 'Win10',
				url: '/win10',
				icon: <Code2 size={18} />,
				description: 'Windows 10 update screen',
			},
			{
				name: 'Ubuntu',
				url: '/ubuntu',
				icon: <Code2 size={18} />,
				description: 'Ubuntu update screen',
			},
		],
	},
]

const DirectoryPage: React.FC = () => {
	return (
		<div className='min-h-screen bg-zinc-50 dark:bg-black py-12 px-6 transition-colors duration-300' style={{
			cursor: "default"
		}}>
			<div className='max-w-4xl mx-auto'>
				<h1
					className='text-4xl font-bold text-zinc-800 dark:text-white mb-4'
					style={{
						fontFamily: 'Kode Mono',
					}}
				>
					Wake Lock
				</h1>
				<p
					className='text-zinc-500 dark:text-zinc-400 mb-8'
					style={{
						fontFamily: 'Kode Mono',
					}}
				>
					Keep your device awake while using these pages. This prevents the
					screen from dimming or locking automatically, allowing you keep your
					screen and CPU active while some important task is ongoing in
					background.
				</p>

				<p
					className='text-zinc-500 dark:text-zinc-400 mb-8'
					style={{
						fontFamily: 'Kode Mono',
					}}
				>
					Here are some keyboard shortcuts to navigate through the pages
				</p>

				<KeyboardShortcuts />

				<h1
					className='text-4xl font-bold text-zinc-800 dark:text-white mb-8 mt-8'
					style={{
						fontFamily: 'Kode Mono',
					}}
				>
					Directory
				</h1>

				<div className='space-y-10'>
					{categories.map((category) => (
						<div key={category.title}>
							<h2
								className='text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4'
								style={{
									fontFamily: 'Kode Mono',
								}}
							>
								{category.title}
							</h2>

							<div className='grid sm:grid-cols-2 gap-4'>
								{category.pages.map((page) => (
									<Link
										key={page.url}
										href={page.url}
										className='flex items-start gap-3 p-4 rounded-lg
                               bg-white dark:bg-neutral-900
                               shadow hover:shadow-md
                               transition-shadow border border-zinc-200 dark:border-neutral-800'
									>
										<div className='text-blue-600 dark:text-blue-400 mt-1'>
											{page.icon}
										</div>
										<div>
											<h3 className='text-lg font-medium text-zinc-800 dark:text-white'>
												{page.name}
											</h3>
											{page.description && (
												<p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
													{page.description}
												</p>
											)}
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DirectoryPage
