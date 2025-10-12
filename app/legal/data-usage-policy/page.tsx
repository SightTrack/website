"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const legalPages = [
	{ name: "Privacy Policy", href: "/legal/privacy-policy" },
	{ name: "Terms & Conditions", href: "/legal/terms-conditions" },
	{ name: "Cookie Policy", href: "/legal/cookie-policy" },
	{ name: "Data Usage & Attribution Policy", href: "/legal/data-usage-policy" },
	{ name: "User Content & Upload Policy", href: "/legal/user-content-policy" },
];

export default function DataUsagePolicyPage() {
	const pathname = usePathname();

	// Animation variants
	const fadeInLeft = {
		hidden: { opacity: 0, x: -60 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	};

	const fadeInRight = {
		hidden: { opacity: 0, x: 60 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const staggerItem = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div className="min-h-screen bg-black text-white font-mono">
			<motion.div
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Navigation */}
					<motion.div className="lg:w-1/4" variants={fadeInLeft}>
						<motion.div
							className="bg-black rounded-lg p-6 border border-gray-800/50"
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.nav className="space-y-2" variants={staggerContainer}>
								{legalPages.map((page) => (
									<motion.div key={page.href} variants={staggerItem}>
										<Link
											href={page.href}
											className={`block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
												pathname === page.href
													? "bg-emerald-600 text-white shadow-lg"
													: "text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-105"
											}`}
										>
											{page.name}
										</Link>
									</motion.div>
								))}
							</motion.nav>
						</motion.div>
					</motion.div>

					{/* Main Content */}
					<motion.div className="lg:w-3/4" variants={fadeInRight}>
						<motion.div
							className="bg-black rounded-lg p-8 border border-gray-800/50"
							whileHover={{ scale: 1.01 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<motion.h1
								className="text-3xl font-bold mb-6"
								variants={staggerItem}
							>
								Data Usage & Attribution Policy
							</motion.h1>

							<motion.div
								className="space-y-6 text-gray-300"
								variants={staggerContainer}
							>
								<motion.div variants={staggerItem}>
									<p className="mb-4">
										<strong>Effective Date:</strong> January 16, 2025
									</p>
									<p className="mb-4">
										<strong>Last Updated:</strong> January 16, 2025
									</p>
								</motion.div>

								<motion.div variants={staggerItem}>
									<p className="mb-6">
										SightTrack (&quot;we,&quot; &quot;our,&quot; or &quot;the
										platform&quot;) is committed to promoting open, responsible
										biodiversity science while respecting the rights and
										contributions of our users. This Data Usage &amp;
										Attribution Policy explains how data submitted by users is
										handled, shared, and licensed.
									</p>
								</motion.div>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										1. User-Contributed Data
									</h2>
									<p className="mb-4">
										Users of SightTrack may contribute ecological observations
										(&quot;Sightings&quot;), which may include:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>Photographs of species or habitats</li>
										<li>Geolocation data (latitude, longitude)</li>
										<li>Date and time of observation</li>
										<li>Descriptive text or tags</li>
									</ul>
									<p className="mb-6">
										Users retain the ability to edit or delete their submitted
										sightings at any time through their personal account.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										2. Ownership and Licensing
									</h2>
									<p className="mb-4">
										All data submitted by users remains the intellectual
										property of the individual contributors. SightTrack does not
										claim ownership over any user-submitted data, including
										images, descriptions, or geospatial information.
									</p>
									<p className="mb-4">
										To support open science and collaborative conservation
										efforts, contributors grant SightTrack a non-exclusive,
										royalty-free, perpetual license to:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Store, process, and display submitted data on our platform
										</li>
										<li>
											Use the data in aggregated or anonymized form for
											analysis, mapping, and research
										</li>
										<li>
											Share data with external organizations and platforms under
											open data terms
										</li>
										<li>
											Train AI models on de-identified datasets to support
											ecological and conservation-related outcomes
										</li>
									</ul>
									<p className="mb-6">
										Unless otherwise noted, all data (excluding private user
										information) is made available under the Creative Commons CC
										BY 4.0 License, which allows reuse with attribution to the
										original contributor.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										3. Public Access and Data Sharing
									</h2>
									<p className="mb-4">
										SightTrack enables open access to biodiversity data to
										advance research, education, and environmental action.
										Specifically:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Public Access: We provide access to contributed data
											through interactive maps, downloadable files, and APIs.
										</li>
										<li>
											Collaborations: We share data with academic institutions,
											nonprofit organizations, schools, and governmental bodies
											engaged in biodiversity monitoring and restoration.
										</li>
										<li>
											Global Databases: We may publish de-identified user data
											to reputable open-science platforms, including:
											<ul className="list-disc pl-6 mt-2 space-y-1">
												<li>GBIF (Global Biodiversity Information Facility)</li>
												<li>iNaturalist</li>
												<li>DataCite and other data repositories</li>
											</ul>
										</li>
									</ul>
									<p className="mb-6">
										In all cases, we work to preserve the privacy and intent of
										our contributors while amplifying the scientific value of
										their observations.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										4. Use in AI & Research
									</h2>
									<p className="mb-4">SightTrack uses contributed data to:</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Train artificial intelligence models for species
											identification and ecological trend analysis
										</li>
										<li>
											Support public reports and conservation recommendations
											based on aggregated community data
										</li>
										<li>
											Provide predictive recommendations and conservation alerts
											(e.g., via the ActionTrack engine)
										</li>
									</ul>
									<p className="mb-6">
										No data is ever sold or used for commercial advertising or
										monetization purposes. Only research-aligned or
										mission-compatible third parties may be granted access under
										open-use agreements.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										5. Attribution Guidelines
									</h2>
									<p className="mb-4">
										When third parties use or redistribute data originating from
										SightTrack:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Attribution must be made to the original contributor
											(user), if identifiable, in accordance with the Creative
											Commons license.
										</li>
										<li>
											Attribution to SightTrack is not required, but encouraged
											where practical to support platform visibility and
											community growth.
										</li>
										<li>
											For citations in academic work or publications, we
											recommend the following format:
										</li>
									</ul>

									<div className="bg-black border border-gray-600 rounded-lg p-6 mb-6">
										<p className="text-gray-300 italic">
											&quot;Species observation data contributed by users of
											SightTrack (sighttrack.org), licensed under CC BY
											4.0.&quot;
										</p>
									</div>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										6. Data Modification and Removal
									</h2>
									<p className="mb-4">Users may:</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Edit their contributions through their personal dashboard
										</li>
										<li>Permanently delete individual sightings</li>
										<li>
											Request deletion of all associated data by contacting
											contact@sighttrack.org
										</li>
									</ul>
									<p className="mb-6">
										Once removed, the data will be purged from active databases
										and withheld from future redistribution. Previously
										published open data may remain in external archives but will
										no longer be updated or linked to user identities.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Contact Us
									</h2>
									<p className="mb-4">
										If you have any questions regarding privacy while using the
										Application, or have questions about the practices, please
										contact the Service Provider via email at:
									</p>
									<div className="bg-black border border-gray-800 p-4 rounded-lg">
										<p>contact@sighttrack.com</p>
									</div>
								</motion.section>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
