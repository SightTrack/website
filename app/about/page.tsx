"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
	const [currentPreview, setCurrentPreview] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [direction, setDirection] = useState<"left" | "right" | "none">("none");
	const previewImages = [
		"/previews/preview1.png",
		"/previews/preview2.png",
		"/previews/preview3.png",
		"/previews/preview4.png",
		"/previews/preview5.png",
		"/previews/preview6.png",
	];

	const nextPreview = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setDirection("right");
		setTimeout(() => {
			setCurrentPreview((prev) => (prev + 1) % previewImages.length);
		}, 150);
		setTimeout(() => {
			setIsAnimating(false);
			setDirection("none");
		}, 500);
	};

	const prevPreview = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setDirection("left");
		setTimeout(() => {
			setCurrentPreview(
				(prev) => (prev - 1 + previewImages.length) % previewImages.length,
			);
		}, 150);
		setTimeout(() => {
			setIsAnimating(false);
			setDirection("none");
		}, 500);
	};

	const goToPreview = (index: number) => {
		if (isAnimating || index === currentPreview) return;
		setIsAnimating(true);
		const diff = index - currentPreview;
		const wrappedDiff =
			diff > previewImages.length / 2
				? diff - previewImages.length
				: diff < -previewImages.length / 2
					? diff + previewImages.length
					: diff;
		setDirection(wrappedDiff > 0 ? "right" : "left");
		setTimeout(() => {
			setCurrentPreview(index);
		}, 150);
		setTimeout(() => {
			setIsAnimating(false);
			setDirection("none");
		}, 500);
	};

	// Animation variants
	const fadeInUp = {
		hidden: { opacity: 0, y: 60 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const fadeInLeft = {
		hidden: { opacity: 0, x: -60 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6 },
		},
	};

	const fadeInRight = {
		hidden: { opacity: 0, x: 60 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6 },
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const staggerItem = {
		hidden: { opacity: 0, y: 30, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<div className="min-h-screen to-black text-white font-mono">
			{/* App Description Section */}
			<motion.section
				className="px-4 py-16 md:py-24"
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div className="space-y-6" variants={fadeInLeft}>
							<motion.h2
								className="text-3xl md:text-4xl font-bold text-white mb-6"
								variants={staggerItem}
							>
								About
							</motion.h2>
							<motion.p
								className="text-lg text-neutral-300 leading-relaxed"
								variants={staggerItem}
							>
								SightTrack is a mobile application that is built to monitor
								local biodiversity of animals and plants. It crowdsources and
								collects sightings from users, and we can use this data to
								understand our environment better.
							</motion.p>
							<motion.p
								className="text-lg text-neutral-300 leading-relaxed"
								variants={staggerItem}
							>
								We use the data to map trends, predict movement, and inform
								conservation efforts.
							</motion.p>
						</motion.div>
						<motion.div className="space-y-8" variants={fadeInRight}>
							<motion.div
								className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-emerald-400/50 transition-colors duration-300"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h3 className="text-xl font-semibold text-emerald-400 mb-3">
									70k Identifiable Species
								</h3>
								<p className="text-neutral-300">
									We use AI to identify species from your photos
								</p>
							</motion.div>
							<motion.div
								className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h3 className="text-xl font-semibold text-blue-400 mb-3">
									150+ Countries Covered
								</h3>
								<p className="text-neutral-300">
									Our app is available globally, with users across the world
								</p>
							</motion.div>
							<motion.div
								className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-400/50 transition-colors duration-300"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h3 className="text-xl font-semibold text-purple-400 mb-3">
									Earn service hours
								</h3>
								<p className="text-neutral-300">
									You can earn service hours as a student
								</p>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Awards Section */}
			<motion.section
				className="px-4 py-16 md:py-24"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={staggerContainer}
			>
				<div className="max-w-6xl mx-auto text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-white mb-8"
						variants={fadeInUp}
					>
						Awards
					</motion.h2>
					<motion.p className="text-lg text-neutral-300" variants={fadeInUp}>
						SightTrack was recognized with the national{" "}
						<a
							href="https://www.intel.com/content/www/us/en/corporate/artificial-intelligence/impact-festival.html"
							className="text-blue-200 hover:text-blue-300 transition-colors duration-200"
						>
							Intel Global AI Festival Award
						</a>{" "}
						for our innovative use of artificial intelligence in biodiversity
						monitoring and conservation efforts.
					</motion.p>
					<motion.div
						variants={fadeInUp}
						whileHover={{ scale: 1.1, rotate: 5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<Image
							src="/images/intel.png"
							alt="Award"
							width={100}
							height={100}
							className="mx-auto mt-8"
						/>
					</motion.div>
				</div>
			</motion.section>

			{/* In Progress Section */}
			<motion.section
				className="px-4 py-16 md:py-24"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={staggerContainer}
			>
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={fadeInLeft}
						>
							<motion.div
								variants={staggerItem}
								whileHover={{ scale: 1.05, rotate: 1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/images/gbif_heatmap.png"
									alt="GBIF Heatmap"
									width={500}
									height={500}
									className="rounded-lg shadow-2xl"
								/>
							</motion.div>
							<motion.p
								className="text-sm text-neutral-400 text-center italic"
								variants={staggerItem}
							>
								<a
									href="https://www.gbif.org/"
									className="text-blue-200 hover:text-blue-300 transition-colors duration-200"
								>
									GBIF
								</a>{" "}
								Data Heatmap for Ontario, Canada
							</motion.p>
						</motion.div>
						<motion.div className="space-y-6" variants={fadeInRight}>
							<motion.h2
								className="text-3xl md:text-4xl font-bold text-white mb-6"
								variants={staggerItem}
							>
								In Progress
							</motion.h2>
							<motion.p
								className="text-lg text-neutral-300 leading-relaxed"
								variants={staggerItem}
							>
								We are currently working on the following features: <br />
								1. Suggest sampling locations after analyzing GBIF data to
								identify blind spots <br />
								2. Use SightTrack data to improve, validate, and expand existing
								GBIF data <br />
								3. Create various sampling methods to collect data, such as
								taking as many sightings in one area or targeting specific
								organisms <br />
							</motion.p>
							<motion.p
								className="text-lg text-neutral-300 leading-relaxed"
								variants={staggerItem}
							>
								These changes would greatly improve accuracy and effectiveness
								of our data.
							</motion.p>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* App Previews Section */}
			<motion.section
				className="px-4 py-16 md:py-24"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
						variants={fadeInUp}
					>
						App Previews
					</motion.h2>
					<div className="relative overflow-hidden">
						{/* Left Arrow */}
						<button
							onClick={prevPreview}
							disabled={isAnimating}
							className={`absolute left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/90 transition-all duration-150 ease-out transform-gpu ${
								isAnimating
									? "opacity-50 cursor-not-allowed"
									: "hover:scale-105"
							}`}
							aria-label="Previous preview"
						>
							<svg
								className="w-5 h-5 md:w-6 md:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						{/* Carousel Container */}
						<div className="relative overflow-hidden">
							<div
								className={`flex items-center justify-center space-x-4 py-8 transition-all duration-500 ease-out ${
									isAnimating && direction === "right"
										? "transform -translate-x-4 opacity-90"
										: isAnimating && direction === "left"
											? "transform translate-x-4 opacity-90"
											: "transform translate-x-0 opacity-100"
								}`}
							>
								{[-2, -1, 0, 1, 2].map((offset) => {
									const index =
										(currentPreview + offset + previewImages.length) %
										previewImages.length;
									const isCenter = offset === 0;
									const isAdjacent = Math.abs(offset) === 1;
									const isOuter = Math.abs(offset) === 2;

									return (
										<div
											key={`${index}-${offset}`}
											className={`relative transition-all duration-500 ease-out cursor-pointer transform-gpu ${
												isCenter ? "z-10" : isAdjacent ? "z-5" : "z-0"
											} ${
												isOuter
													? "opacity-40 hover:opacity-70"
													: isAdjacent
														? "opacity-70 hover:opacity-90"
														: "opacity-100"
											} ${
												isAnimating
													? direction === "right"
														? offset === 0
															? "transform translate-x-2 scale-95 opacity-80"
															: offset === 1
																? "transform translate-x-4 scale-90 opacity-60"
																: offset === -1
																	? "transform -translate-x-4 scale-90 opacity-60"
																	: ""
														: direction === "left"
															? offset === 0
																? "transform -translate-x-2 scale-95 opacity-80"
																: offset === 1
																	? "transform translate-x-4 scale-90 opacity-60"
																	: offset === -1
																		? "transform -translate-x-4 scale-90 opacity-60"
																		: ""
															: ""
													: ""
											}`}
											onClick={() => goToPreview(index)}
										>
											<div
												className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-out transform-gpu ${
													isCenter
														? "bg-gray-800/40 backdrop-blur-sm border-2 border-blue-400/50 shadow-2xl hover:border-blue-400/70"
														: isAdjacent
															? "bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 shadow-xl hover:border-gray-500/70"
															: "bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 shadow-lg hover:border-gray-600/50"
												} hover:scale-105 ${
													isAnimating && isCenter
														? direction === "right"
															? "animate-pulse shadow-blue-500/30"
															: direction === "left"
																? "animate-pulse shadow-blue-500/30"
																: ""
														: ""
												}`}
											>
												<div className="p-3">
													<Image
														src={previewImages[index]}
														alt={`App Preview ${index + 1}`}
														width={200}
														height={400}
														className={`rounded-xl transition-all duration-500 ease-out w-40 h-auto shadow-xl transform-gpu ${
															isAnimating
																? isCenter
																	? "opacity-90 brightness-110"
																	: "opacity-70"
																: "opacity-100"
														}`}
														priority={isCenter || isAdjacent}
													/>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Right Arrow */}
						<button
							onClick={nextPreview}
							disabled={isAnimating}
							className={`absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/90 transition-all duration-150 ease-out transform-gpu ${
								isAnimating
									? "opacity-50 cursor-not-allowed"
									: "hover:scale-105"
							}`}
							aria-label="Next preview"
						>
							<svg
								className="w-5 h-5 md:w-6 md:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					{/* Preview Indicators */}
					<div className="flex justify-center mt-8 space-x-3">
						{previewImages.map((_, index) => (
							<button
								key={index}
								onClick={() => goToPreview(index)}
								disabled={isAnimating}
								className={`w-3 h-3 rounded-full transition-all duration-150 ease-out transform-gpu ${
									index === currentPreview
										? "bg-blue-400 scale-125"
										: "bg-gray-600 hover:bg-gray-500 hover:scale-110"
								} ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
								aria-label={`Go to preview ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</motion.section>

			{/* Team Section */}
			<motion.section
				className="px-4 py-12 md:py-16"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="max-w-5xl mx-auto text-center">
					<motion.h2
						className="text-2xl md:text-3xl font-bold text-white mb-8"
						variants={fadeInUp}
					>
						Our Team
					</motion.h2>

					{/* Founder Row */}
					<motion.div
						className="flex justify-center mb-10"
						variants={staggerItem}
					>
						<motion.div
							className="flex flex-col items-center space-y-3"
							whileHover={{ y: -10 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/james.png"
									alt="James Tan"
									width={140}
									height={140}
									className="rounded-full border-3 border-blue-400/50 shadow-xl hover:border-blue-400/70 transition-all duration-300"
								/>
							</motion.div>
							<motion.div className="text-center" variants={staggerItem}>
								<h3 className="text-lg font-semibold text-white">James Tan</h3>
								<p className="text-neutral-400 mt-1 text-sm">
									Founder, Developer
								</p>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Team Members Grid - 2 rows of 3 */}
					<motion.div
						className="grid grid-cols-3 gap-6 md:gap-8 mt-12"
						variants={staggerContainer}
					>
						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/alina.png"
									alt="Alina"
									width={120}
									height={120}
									className="rounded-full border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300"
								/>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">Alina Sun</h3>
								<p className="text-neutral-400 mt-1 text-sm">UI Design</p>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/andrew.png"
									alt="Andrew"
									width={120}
									height={120}
									className="rounded-full border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300"
								/>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">Andrew Ma</h3>
								<p className="text-neutral-400 mt-1 text-sm">UI Design</p>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/david.png"
									alt="David"
									width={120}
									height={120}
									className="rounded-full border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300"
								/>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">David Liu</h3>
								<p className="text-neutral-400 mt-1 text-sm">UI Design</p>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/emma.png"
									alt="Emma"
									width={120}
									height={120}
									className="rounded-full border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300"
								/>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">Emma Bi</h3>
								<p className="text-neutral-400 mt-1 text-sm">UI Design, Marketing</p>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/portraits/mike.png"
									alt="Mike"
									width={120}
									height={120}
									className="rounded-full border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300"
								/>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">Mike Li</h3>
								<p className="text-neutral-400 mt-1 text-sm">Developer</p>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col items-center space-y-3"
							variants={staggerItem}
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gray-600/50 shadow-lg hover:border-gray-500/70 transition-all duration-300">
									<Image
										src="/portraits/daniel.png"
										alt="Daniel"
										width={120}
										height={120}
										className="w-full h-full object-cover"
										style={{ objectPosition: "center 20%" }}
									/>
								</div>
							</motion.div>
							<div className="text-center">
								<h3 className="text-base font-semibold text-white">Daniel Zhao</h3>
								<p className="text-neutral-400 mt-1 text-sm">Founding Advisor</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
}
