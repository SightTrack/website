"use client";

import { FlipWords } from "./components/FlipText";
import { TailwindButton } from "./components/TailwindButton";

export default function Home() {
	const words = [
		"innovative",
		"precise",
		"advanced",
		"reliable",
		"collaborative",
	];

	const handleButtonClick = () => {
		// You can customize this function based on your needs
		console.log("Button clicked!");
	};

	const handleVideoError = (
		e: React.SyntheticEvent<HTMLVideoElement, Event>,
	) => {
		const video = e.target as HTMLVideoElement;
		console.error("Video playback error:", video.error);
		// Try to recover by reloading the video
		video.load();
		video.play().catch(console.error);
	};

	return (
		<div className="relative min-h-screen w-full overflow-hidden font-mono">
			{/* Video container with darkening overlay and vignette */}
			<div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
				<video
					autoPlay
					loop
					muted
					playsInline
					webkit-playsinline="true"
					x5-playsinline="true"
					preload="none"
					className="absolute top-0 left-0 w-full h-full object-cover [image-rendering:crisp-edges] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] brightness-[0.7] md:scale-100 scale-[1.5] md:block hidden"
				>
					<source src="/videos/footage.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<video
					autoPlay
					loop
					muted
					playsInline
					webkit-playsinline="true"
					x5-playsinline="true"
					preload="none"
					onError={handleVideoError}
					className="absolute top-0 left-0 w-full h-full object-cover [image-rendering:crisp-edges] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] brightness-[0.7] md:hidden block"
				>
					<source src="/videos/footage-mobile.mp4" type="video/mp4" />
					<source src="/videos/footage-mobile.webm" type="video/webm" />
					Your browser does not support the video tag.
				</video>
				{/* Dark overlay */}
				<div className="absolute inset-0 bg-black/30"></div>
				{/* Vignette effect */}
				<div className="absolute inset-0 bg-[radial-gradient(circle,transparent_25%,rgba(0,0,0,0.6)_80%,rgba(0,0,0,0.8)_100%)]"></div>
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
								<FlipWords words={words} />
							</span>{" "}
							sustainabilty solutions
						</div>
					</div>
				</div>
				<div className="flex justify-center text-center animate-fade-in">
					<TailwindButton onClick={handleButtonClick}>
						Learn More
					</TailwindButton>
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
