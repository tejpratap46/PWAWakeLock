import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
	{ label: 'Story', href: '/story' },
	{ label: 'Recipes', href: '/recipes' },
]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
			<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>Wake Lock</h1>
						</a>
					</Link>
				</div>
			</header>
		</div>
	)
}

export default Appbar
