"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DonatePage() {
	// Animation variants
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
		<div className="font-mono min-h-screen bg-black text-white overflow-x-hidden">
			<motion.div
				className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-16 min-h-auto flex flex-col"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={staggerContainer}
			>
				<motion.div
					className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-16 py-4 md:py-8"
					variants={staggerContainer}
				>
					{/* Hero Section */}
					<motion.div
						className="mb-8 md:mb-12 max-w-3xl"
						variants={staggerContainer}
					>
						<motion.h1
							className="text-5xl sm:text-6xl md:text-5xl font-extralight tracking-tight mb-6 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent leading-tight"
							variants={staggerItem}
						>
							Support SightTrack
						</motion.h1>
						<motion.h2
							className="text-lg sm:text-xl md:text-1xl font-light tracking-tight mb-6 md:mb-8 text-gray-400 leading-relaxed"
							variants={staggerItem}
						>
							Help us protect wildlife through citizen science
						</motion.h2>
						<motion.p
							className="text-base sm:text-lg leading-relaxed text-gray-300 font-light max-w-2xl"
							variants={staggerItem}
						>
							Your donation helps us maintain our platform, expand our reach,
							and support conservation efforts worldwide.{" "}
							<span className="text-white font-normal">
								Every contribution makes a difference
							</span>{" "}
							in protecting biodiversity and building a community of wildlife
							advocates.
						</motion.p>
					</motion.div>

					{/* Goal Section */}
					<motion.div
						className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 md:p-8 my-6 md:my-8 text-center"
						variants={staggerItem}
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.h3
							className="text-xl md:text-2xl font-medium text-white mb-4"
							variants={staggerItem}
						>
							Our Goal
						</motion.h3>
						<motion.div
							className="text-4xl md:text-5xl font-light text-white my-2"
							variants={staggerItem}
						>
							$10,000
						</motion.div>
						<motion.p
							className="text-sm md:text-base text-gray-400 font-light"
							variants={staggerItem}
						>
							Help us build technology for wildlife conservation and expand our
							impact worldwide
						</motion.p>
					</motion.div>

					{/* Donate Button */}
					<motion.a
						href="https://www.gofundme.com/f/donate-to-sighttrack"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-white/10 border border-white/20 rounded-xl px-6 md:px-8 py-3 md:py-4 text-white transition-all duration-300 cursor-pointer text-center text-base md:text-lg font-medium my-6 md:my-8 hover:bg-white/15 hover:border-white/30"
						variants={staggerItem}
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						Donate on GoFundMe
					</motion.a>

					{/* Thank You Message */}
					<motion.p
						className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/[0.05] text-sm md:text-base text-gray-400 font-light"
						variants={staggerItem}
					>
						Thank you for supporting wildlife conservation and helping us build
						a better future for all species on Earth.
					</motion.p>
				</motion.div>

				{/* Logo Carousel */}
				<motion.div
					className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.05] overflow-hidden w-full relative logo-carousel"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					variants={staggerContainer}
				>
					<motion.h4
						className="text-center text-white/60 text-sm mb-4 md:mb-6 font-light"
						variants={staggerItem}
					>
						Support
					</motion.h4>
					<motion.div
						className="overflow-hidden relative w-full h-20 flex items-center"
						variants={staggerItem}
					>
						{/* Gradient overlays */}
						<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
						<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

						{/* Logo track */}
						<motion.div
							className="flex animate-scroll gap-24 items-center whitespace-nowrap will-change-transform"
							variants={staggerItem}
						>
							{/* First set of logos */}
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ebird.png"
									alt="eBird"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/inaturalist.png"
									alt="iNaturalist"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/nature.png"
									alt="Nature"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ontario_nature.png"
									alt="Ontario Nature"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ormlt.png"
									alt="ORMLT"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							{/* Duplicate set for seamless loop */}
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ebird.png"
									alt="eBird"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/inaturalist.png"
									alt="iNaturalist"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/nature.png"
									alt="Nature"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ontario_nature.png"
									alt="Ontario Nature"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
							<motion.div
								className="flex-shrink-0 h-16 opacity-90 transition-all duration-300 flex items-center justify-center min-w-44"
								whileHover={{ opacity: 1, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logos/ormlt.png"
									alt="ORMLT"
									width={180}
									height={64}
									className="h-full w-auto object-contain max-w-44"
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
