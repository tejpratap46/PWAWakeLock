import { ActionImpl } from 'kbar' // adjust import if needed
import { Book, Code2, FileText, PlayCircle } from 'lucide-react'
import React from 'react'

export type ActionId = string

export type Action = {
	id: ActionId
	name: string
	shortcut?: string[]
	keywords?: string
	section?: string
	icon?: string | React.ReactElement | React.ReactNode
	subtitle?: string
	perform?: (currentActionImpl: ActionImpl) => any
	parent?: ActionId
}

const toggleFullScreen = () => {
	if (document.fullscreenElement == null) {
		document.body.requestFullscreen().then((r) => {})
	} else {
		document.exitFullscreen().then((r) => {})
	}
}

export const actions: Action[] = [
	// Actions
	{
		id: 'fullscreen',
		name: 'Toggle Fullscreen',
		section: 'Actions',
		icon: <PlayCircle size={18} />,
		subtitle: 'Toggle Fullscreen mode',
		perform: () => toggleFullScreen(),
	},
	// Awesome
	{
		id: 'solar',
		name: 'Solar',
		section: 'Awesome',
		icon: <FileText size={18} />,
		subtitle: 'Solar System',
		perform: () => (window.location.href = '/solar'),
	},
	{
		id: 'weather',
		name: 'Weather',
		section: 'Awesome',
		icon: <Code2 size={18} />,
		subtitle: 'Weather in your city',
		perform: () => (window.location.href = '/weather'),
	},
	{
		id: 'matrix',
		name: 'Matrix',
		section: 'Awesome',
		icon: <Code2 size={18} />,
		subtitle: 'Matrix Rain',
		perform: () => (window.location.href = '/matrix'),
	},
	{
		id: 'globe',
		name: 'Globe',
		section: 'Awesome',
		icon: <Code2 size={18} />,
		subtitle: 'Rotating Globe with grab',
		perform: () => (window.location.href = '/globe'),
	},
	{
		id: 'emoji',
		name: 'Emoji',
		section: 'Awesome',
		icon: <Code2 size={18} />,
		subtitle: 'Emoji Rain',
		perform: () => (window.location.href = '/emoji'),
	},

	// Clocks
	{
		id: 'digital',
		name: 'Digital',
		section: 'Clocks',
		icon: <Book size={18} />,
		subtitle: 'Digital clock with animation',
		perform: () => (window.location.href = '/digital'),
	},
	{
		id: 'analog',
		name: 'Analog',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'Analog Clock',
		perform: () => (window.location.href = '/analog'),
	},
	{
		id: 'apple',
		name: 'Apple Watch',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'Apple Rings Clock',
		perform: () => (window.location.href = '/apple'),
	},
	{
		id: 'pw',
		name: 'Pixel Watch',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'Pixel Watch Inspired Clock',
		perform: () => (window.location.href = '/pw'),
	},
	{
		id: 'shadow',
		name: 'Shadow Clock',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'A Shadow/Dark clock, which can only be read in night',
		perform: () => (window.location.href = '/shadow'),
	},
	{
		id: 'timezone',
		name: 'Timezone',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: '2 Timezones running together',
		perform: () => (window.location.href = '/timezone'),
	},
	{
		id: 'word',
		name: 'Word',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'Word clock',
		perform: () => (window.location.href = '/word'),
	},
	{
		id: 'world',
		name: 'World',
		section: 'Clocks',
		icon: <PlayCircle size={18} />,
		subtitle: 'World clock',
		perform: () => (window.location.href = '/world'),
	},

	// Fake Update
	{
		id: 'win11',
		name: 'Win11',
		section: 'Fake Update',
		icon: <FileText size={18} />,
		subtitle: 'Windows 11 update screen',
		perform: () => (window.location.href = '/win11'),
	},
	{
		id: 'win10',
		name: 'Win10',
		section: 'Fake Update',
		icon: <Code2 size={18} />,
		subtitle: 'Windows 10 update screen',
		perform: () => (window.location.href = '/win10'),
	},
	{
		id: 'ubuntu',
		name: 'Ubuntu',
		section: 'Fake Update',
		icon: <Code2 size={18} />,
		subtitle: 'Ubuntu update screen',
		perform: () => (window.location.href = '/ubuntu'),
	},
]

// convert actions to routeList
export const routeList: string[] = actions
	.filter((action) => action.section != 'Actions')
	.map((action) => {
		if (action.perform) {
			return `/${action.id}`
		}
		return ''
	})
	.filter((route) => route !== '')
