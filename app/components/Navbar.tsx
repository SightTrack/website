"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="font-mono shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full mt-2">
				<div className="flex justify-between items-center h-20">
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/logo.png"
								alt="Logo"
								width={40}
								height={40}
								priority
							/>
							<div className="flex flex-col">
								<span className="text-3xl font-bold text-green-400">
									SightTrack
								</span>
								<span className="text-sm text-gray-400">
									Monitoring & Conservation
								</span>
							</div>
						</Link>
					</div>

					{/* Desktop menu */}
					<div className="hidden sm:flex sm:items-center">
						<div className="ml-10 flex items-center space-x-4">
							<Link
								href="/map"
								className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
							>
								Map
							</Link>
							<Link
								href="/about"
								className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
							>
								About
							</Link>
							<Link
								href="/legal"
								className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
							>
								Legal
							</Link>
							<Link
								href="/contact"
								className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
							>
								Contact
							</Link>
							<Link
								href="/donate"
								className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
							>
								Donate
							</Link>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="flex sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-gray-900 hover:bg-gray-100"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							{!isMenuOpen ? (
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="sm:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							href="/map"
							className="block text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
						>
							Map
						</Link>
						<Link
							href="/about"
							className="block text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
						>
							About
						</Link>
						<Link
							href="/legal"
							className="block text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
						>
							Legal
						</Link>
						<Link
							href="/contact"
							className="block text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
						>
							Contact
						</Link>
						<Link
							href="/donate"
							className="block text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md"
						>
							Donate
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
