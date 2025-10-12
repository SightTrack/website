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

export default function UserContentPolicyPage() {
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
								User Content & Upload Policy
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
										SightTrack ("we," "our," or "the platform") is dedicated to
										fostering a respectful, science-driven community where users
										can document and share observations of biodiversity. This
										policy outlines the rules and expectations regarding content
										uploaded by users, including how it is moderated, used, and
										protected.
									</p>
									<p className="mb-6">
										By contributing content to SightTrack, you agree to abide by
										this policy.
									</p>
								</motion.div>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										1. Types of User Content
									</h2>
									<p className="mb-4">
										Registered users of SightTrack may contribute the following
										forms of content:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Photographs of species or habitats observed in nature
										</li>
										<li>
											Text descriptions such as species names, habitat notes,
											behavioral details, or other ecological observations
										</li>
									</ul>
									<p className="mb-6">
										At this time, uploads are limited to image files and textual
										input. Video, audio, or other media formats are not
										currently supported.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										2. Content Guidelines
									</h2>
									<p className="mb-4">
										To maintain the integrity and safety of the platform, all
										user-submitted content must comply with the following rules:
									</p>

									<div className="bg-green-900/20 border border-green-600 p-6 rounded-lg mb-6">
										<h4 className="text-lg font-semibold mb-3 text-green-200">
											Permitted Content:
										</h4>
										<ul className="list-disc pl-6 space-y-2 text-gray-300">
											<li>Original photographs taken by the user</li>
											<li>
												Images of wildlife, plants, fungi, and natural
												environments
											</li>
											<li>Factual or descriptive ecological observations</li>
										</ul>
									</div>

									<div className="bg-red-900/20 border border-red-600 p-6 rounded-lg">
										<h4 className="text-lg font-semibold mb-3 text-red-200">
											Prohibited Content:
										</h4>
										<ul className="list-disc pl-6 space-y-2 text-gray-300">
											<li>
												Non-nature-related images (e.g., selfies, pets,
												advertising)
											</li>
											<li>
												Inappropriate, offensive, or graphic content, including
												hate speech, harassment, or violence
											</li>
											<li>Copyrighted material not owned by the uploader</li>
											<li>Misleading or falsified data submissions</li>
											<li>
												Images containing identifiable individuals, unless
												incidental and non-central
											</li>
										</ul>
									</div>

									<p className="mt-6">
										SightTrack reserves the right to restrict uploads to
										biodiversity-related content only. Content outside this
										scope may be removed without notice.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										3. User Rights and Platform License
									</h2>
									<p className="mb-4">
										You, as the user, retain full ownership of your uploaded
										content, including photographs and written descriptions.
									</p>
									<p className="mb-4">
										By submitting content to SightTrack, you grant the platform
										a non-exclusive, royalty-free, worldwide license to:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>Display your content on our website and app</li>
										<li>
											Use your content in maps, dashboards, educational
											materials, and scientific tools
										</li>
										<li>
											Share or archive your content in public biodiversity
											repositories (e.g., GBIF, iNaturalist), with attribution
											when possible
										</li>
										<li>
											Use your content (in anonymized or transformed form) for
											AI model training, system optimization, and environmental
											research
										</li>
									</ul>
									<p className="mb-6">
										This license remains in effect even if the content is later
										removed, but we will cease future use upon deletion when
										technically feasible.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										4. Moderation Process
									</h2>
									<p className="mb-4">
										SightTrack employs a combination of automated filters,
										manual review by moderators, and community flagging to
										ensure all content meets our standards.
									</p>
									<p className="mb-4">Moderation includes:</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Automated detection of inappropriate or duplicate images
										</li>
										<li>Manual inspection by trained admins</li>
										<li>
											Community reporting: Any user may flag a sighting they
											believe violates the policy
										</li>
									</ul>
									<p className="mb-6">
										We reserve the sole right to remove or hide any content
										deemed inappropriate, irrelevant, or harmful—without prior
										notice. Repeat or serious violations may result in further
										enforcement actions.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										5. Violations and Enforcement
									</h2>
									<p className="mb-4">
										Violations of this policy will be addressed with the
										following escalation process:
									</p>
									<ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-300">
										<li>
											First offense – Written warning and optional content
											removal
										</li>
										<li>
											Second offense – Temporary suspension of account
											privileges
										</li>
										<li>
											Third offense or severe violation – Permanent ban from the
											platform
										</li>
									</ol>
									<p className="mb-4">
										If you believe your content was mistakenly removed or your
										account was unfairly restricted, you may submit an appeal by
										contacting us at:
									</p>
									<div className="bg-black border border-gray-600 rounded-lg p-6 mb-6">
										<p className="text-gray-300">
											Email: contact@sighttrack.org
										</p>
									</div>
									<p className="mb-6">
										Our moderation team will review appeals within a reasonable
										timeframe and respond accordingly.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										6. Final Notes
									</h2>
									<p className="mb-4">
										By uploading any content to SightTrack, you confirm that:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>You own the rights to the material</li>
										<li>
											You are not violating any third-party rights or local laws
										</li>
										<li>
											Your contributions align with the mission of biodiversity
											protection and education
										</li>
									</ul>
									<p className="mb-6">
										SightTrack reserves the right to update this policy at any
										time. Continued use of the platform after updates
										constitutes agreement to the revised terms.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Contact Us
									</h2>
									<p className="mb-4">
										If you have any questions or suggestions about the Terms and
										Conditions, please do not hesitate to contact the Service
										Provider at:
									</p>
									<div className="bg-black border border-gray-800 p-4 rounded-lg">
										<p>contact@sighttrack.org</p>
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
