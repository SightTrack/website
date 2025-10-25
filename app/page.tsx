"use client";

import { FlipWords } from "./components/FlipText";
import { Button } from "./components/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const [videoLoaded, setVideoLoaded] = useState(false);
	const words = [
		"innovative",
		"precise",
		"advanced",
		"reliable",
		"collaborative",
	];

	// Delay video loading for better initial page load
	useEffect(() => {
		const timer = setTimeout(() => {
			setVideoLoaded(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="relative min-h-screen w-full overflow-hidden font-mono">
			{/* Background with single overlay */}
			<div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
				{videoLoaded && (
					<>
						{/* Desktop video */}
						<video
							autoPlay
							loop
							muted
							playsInline
							preload="none"
							poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23111827' width='1' height='1'/%3E%3C/svg%3E"
							className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7] md:block hidden will-change-auto"
						>
							<source src="/videos/footage-optimized.webm" type="video/webm" />
							<source src="/videos/footage-optimized.mp4" type="video/mp4" />
						</video>
						{/* Mobile video */}
						<video
							autoPlay
							loop
							muted
							playsInline
							preload="none"
							poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23111827' width='1' height='1'/%3E%3C/svg%3E"
							className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7] md:hidden block will-change-auto"
						>
							<source src="/videos/footage-mobile.webm" type="video/webm" />
							<source src="/videos/footage-mobile.mp4" type="video/mp4" />
						</video>
					</>
				)}
				{/* Simplified overlay */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.5)_100%)]"></div>
			</div>
			<div className="relative z-10">
				<div className="min-h-[40rem] flex justify-center items-center px-4 py-8 md:py-0">
					<div className="flex flex-col items-center space-y-4 md:space-y-6 max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300 text-center tracking-tight animate-fade-in leading-relaxed pb-2">
							Welcome to SightTrack
						</h1>
						<div className="text-lg md:text-xl font-light text-neutral-200 text-center tracking-wide animate-fade-in px-4">
							Delivering{" "}
							<span className="font-medium">
								<FlipWords words={words} duration={3000} />
							</span>{" "}
							sustainabilty solutions
						</div>
					</div>
				</div>
				<div className="flex justify-center text-center animate-fade-in">
					<Button onClick={() => router.push("/about")}>Learn More</Button>
				</div>
			</div>
			{/* Video credit */}
			<div className="absolute bottom-4 right-4 z-10">
				<a
					href="https://www.instagram.com/jturner0/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-400 text-sm font-light opacity-70 hover:opacity-100 hover:text-gray-300 transition-all duration-200"
				>
					Video by Joshua Turner
				</a>
			</div>
		</div>
	);
}
