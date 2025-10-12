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

export default function PrivacyPolicyPage() {
	const pathname = usePathname();

	// Animation variants

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
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const staggerItem = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
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
								Privacy Policy
							</motion.h1>

							<motion.div
								className="space-y-6 text-gray-300"
								variants={staggerContainer}
							>
								<motion.div variants={staggerItem}>
									<p className="mb-4">
										<strong>Effective Date:</strong> January 16, 2025
									</p>
								</motion.div>

								<motion.div variants={staggerItem}>
									<p className="mb-6">
										This privacy policy applies to the SightTrack app (hereby
										referred to as &quot;Application&quot;) for mobile devices
										that was created by SightTrack (hereby referred to as
										&quot;Service Provider&quot;) as a Free service. This
										service is intended for use &quot;AS IS&quot;.
									</p>
								</motion.div>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Information Collection and Use
									</h2>
									<p className="mb-4">
										The Application collects information when you download and
										use it. This information may include information such as:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Your device&apos;s Internet Protocol address (e.g. IP
											address)
										</li>
										<li>
											The pages of the Application that you visit, the time and
											date of your visit, the time spent on those pages
										</li>
										<li>The time spent on the Application</li>
										<li>The operating system you use on your mobile device</li>
									</ul>

									<p className="mb-4">
										The Application does not gather precise information about
										the location of your mobile device.
									</p>

									<p className="mb-4">
										The Service Provider may use the information you provided to
										contact you from time to time to provide you with important
										information, required notices and marketing promotions.
									</p>

									<p className="mb-6">
										For a better experience, while using the Application, the
										Service Provider may require you to provide us with certain
										personally identifiable information. The information that
										the Service Provider request will be retained by them and
										used as described in this privacy policy.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Third Party Access
									</h2>
									<p className="mb-4">
										Only aggregated, anonymized data is periodically transmitted
										to external services to aid the Service Provider in
										improving the Application and their service. The Service
										Provider may share your information with third parties in
										the ways that are described in this privacy statement.
									</p>

									<p className="mb-4">
										The Service Provider may disclose User Provided and
										Automatically Collected Information:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											as required by law, such as to comply with a subpoena, or
											similar legal process
										</li>
										<li>
											when they believe in good faith that disclosure is
											necessary to protect their rights, protect your safety or
											the safety of others, investigate fraud, or respond to a
											government request
										</li>
										<li>
											with their trusted services providers who work on their
											behalf, do not have an independent use of the information
											we disclose to them, and have agreed to adhere to the
											rules set forth in this privacy statement
										</li>
									</ul>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Opt-Out Rights
									</h2>
									<p className="mb-6">
										You can stop all collection of information by the
										Application easily by uninstalling it. You may use the
										standard uninstall processes as may be available as part of
										your mobile device or via the mobile application marketplace
										or network.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Data Retention Policy
									</h2>
									<p className="mb-6">
										The Service Provider will retain User Provided data for as
										long as you use the Application and for a reasonable time
										thereafter. If you&apos;d like them to delete User Provided
										Data that you have provided via the Application, please
										contact them at contact@sighttrack.com and they will respond
										in a reasonable time.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Children
									</h2>
									<p className="mb-4">
										The Service Provider does not use the Application to
										knowingly solicit data from or market to children under the
										age of 13.
									</p>

									<p className="mb-4">
										The Service Provider does not knowingly collect personally
										identifiable information from children. The Service Provider
										encourages all children to never submit any personally
										identifiable information through the Application and/or
										Services. The Service Provider encourage parents and legal
										guardians to monitor their children&apos;s Internet usage
										and to help enforce this Policy by instructing their
										children never to provide personally identifiable
										information through the Application and/or Services without
										their permission.
									</p>

									<p className="mb-6">
										If you have reason to believe that a child has provided
										personally identifiable information to the Service Provider
										through the Application and/or Services, please contact the
										Service Provider at contact@sighttrack.com so that they will
										be able to take the necessary actions. You must also be at
										least 16 years of age to consent to the processing of your
										personally identifiable information in your country (in some
										countries we may allow your parent or guardian to do so on
										your behalf).
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Security
									</h2>
									<p className="mb-6">
										The Service Provider is concerned about safeguarding the
										confidentiality of your information. The Service Provider
										provides physical, electronic, and procedural safeguards to
										protect information the Service Provider processes and
										maintains.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Changes
									</h2>
									<p className="mb-6">
										This Privacy Policy may be updated from time to time for any
										reason. The Service Provider will notify you of any changes
										to the Privacy Policy by updating this page with the new
										Privacy Policy. You are advised to consult this Privacy
										Policy regularly for any changes, as continued use is deemed
										approval of all changes.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Your Consent
									</h2>
									<p className="mb-6">
										By using the Application, you are consenting to the
										processing of your information as set forth in this Privacy
										Policy now and as amended by us.
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
									<motion.div
										className="bg-black border border-gray-800 p-4 rounded-lg inline-block"
										whileHover={{ scale: 1.05 }}
										transition={{ type: "spring", stiffness: 400 }}
									>
										<motion.a
											href="mailto:contact@sighttrack.com"
											className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
										>
											contact@sighttrack.com
										</motion.a>
									</motion.div>
								</motion.section>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
