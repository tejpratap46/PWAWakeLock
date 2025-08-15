import React from "react";
import { Book, FileText, Code2, PlayCircle } from "lucide-react";
import Link from "next/link";

type PageLink = {
	name: string;
	url: string;
	icon: React.ReactNode;
	description?: string;
};

type Category = {
	title: string;
	pages: PageLink[];
};

const categories: Category[] = [
	{
		title: "Clocks",
		pages: [
			{ name: "Digital", url: "/digital", icon: <Book size={18} />, description: "Digital clock with animation" },
			{ name: "Analog", url: "/analog", icon: <PlayCircle size={18} />, description: "Analog Clock" },
			{ name: "Apple Watch", url: "/apple", icon: <PlayCircle size={18} />, description: "Apple Rings Clock" },
			{ name: "Pixel Watch", url: "/pw", icon: <PlayCircle size={18} />, description: "Pixel Watch Inspired Clock" },
			{ name: "Shadow Clock", url: "/shadow", icon: <PlayCircle size={18} />, description: "A Shadow/Dark clock, which can only be read in night" },
			{ name: "Timezone", url: "/timezone", icon: <PlayCircle size={18} />, description: "Timezone" },
		],
	},
	{
		title: "Guides",
		pages: [
			{ name: "Routing", url: "/docs/routing", icon: <FileText size={18} />, description: "Setup app navigation" },
			{ name: "State Management", url: "/docs/state", icon: <Code2 size={18} />, description: "Manage app state" },
		],
	},
];

const DirectoryPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-6 transition-colors duration-300">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
					Directory
				</h1>

				<div className="space-y-10">
					{categories.map((category) => (
						<div key={category.title}>
							<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
								{category.title}
							</h2>

							<div className="grid sm:grid-cols-2 gap-4">
								{category.pages.map((page) => (
									<Link
										key={page.url}
										href={page.url}
										className="flex items-start gap-3 p-4 rounded-lg
                               bg-white dark:bg-neutral-900
                               shadow hover:shadow-md
                               transition-shadow border border-gray-200 dark:border-neutral-800"
									>
										<div className="text-blue-600 dark:text-blue-400 mt-1">
											{page.icon}
										</div>
										<div>
											<h3 className="text-lg font-medium text-gray-800 dark:text-white">
												{page.name}
											</h3>
											{page.description && (
												<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
	);
};

export default DirectoryPage;
