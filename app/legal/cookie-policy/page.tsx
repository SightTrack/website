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

export default function CookiePolicyPage() {
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
								Cookie Policy
							</motion.h1>

							<motion.div
								className="space-y-6 text-gray-300"
								variants={staggerContainer}
							>
								<div>
									<p className="mb-4">
										<strong>Effective Date:</strong> January 16, 2025
									</p>
								</div>

								<div>
									<p className="mb-6">
										SightTrack (&quot;we,&quot; &quot;us,&quot; or
										&quot;our&quot;) is committed to protecting your privacy and
										ensuring transparency in how we use cookies and similar
										technologies on our website sighttrack.org and related
										services.
									</p>
									<p className="mb-6">
										This Cookie Policy explains what cookies are, how and why we
										use them, and your choices regarding their use.
									</p>
								</div>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										1. What Are Cookies?
									</h2>
									<p className="mb-4">
										Cookies are small text files that are stored on your browser
										or device when you visit a website. They allow the site to
										recognize your device, remember your preferences, and
										improve your experience. Cookies can be:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Session cookies: Deleted when you close your browser.
										</li>
										<li>
											Persistent cookies: Stored until they expire or are
											manually deleted.
										</li>
									</ul>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										2. Why We Use Cookies
									</h2>
									<p className="mb-4">
										SightTrack uses cookies only where necessary to ensure our
										platform functions properly and provides an accessible and
										personalized experience. We do not use cookies for marketing
										or advertising purposes.
									</p>
									<p className="mb-4">Specifically, we use cookies to:</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											Maintain secure login sessions for registered users.
										</li>
										<li>
											Remember user preferences, such as default location or
											display settings.
										</li>
										<li>
											Enhance performance and usability (e.g., ensuring map
											layers display correctly via Mapbox).
										</li>
									</ul>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										3. Types of Cookies We Use
									</h2>
									<div className="overflow-x-auto mb-6">
										<table className="w-full border-collapse bg-black border border-gray-600 rounded-lg">
											<thead>
												<tr className="bg-gray-900">
													<th className="p-4 text-left border-b border-gray-600 text-white font-medium">
														Cookie Type
													</th>
													<th className="p-4 text-left border-b border-l border-gray-600 text-white font-medium">
														Purpose
													</th>
													<th className="p-4 text-left border-b border-l border-gray-600 text-white font-medium">
														Example Usage
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="p-4 border-b border-gray-600 text-gray-300 font-normal">
														Strictly Necessary
													</td>
													<td className="p-4 border-b border-l border-gray-600 text-gray-300">
														Essential for core functions such as login and user
														authentication.
													</td>
													<td className="p-4 border-b border-l border-gray-600 text-gray-300">
														Remembering session tokens
													</td>
												</tr>
												<tr>
													<td className="p-4 border-b border-gray-600 text-gray-300 font-normal">
														Functionality
													</td>
													<td className="p-4 border-b border-l border-gray-600 text-gray-300">
														Used to remember user choices and improve
														functionality.
													</td>
													<td className="p-4 border-b border-l border-gray-600 text-gray-300">
														Saving display or location preferences
													</td>
												</tr>
												<tr>
													<td className="p-4 text-gray-300 font-normal">
														Third-Party
													</td>
													<td className="p-4 border-l border-gray-600 text-gray-300">
														Limited use of embedded third-party services such as
														Mapbox for maps.
													</td>
													<td className="p-4 border-l border-gray-600 text-gray-300">
														Displaying interactive geolocation maps
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<p className="mb-6">
										We do not use advertising, behavioral tracking, or social
										media integration cookies.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										4. Third-Party Services
									</h2>
									<p className="mb-4">
										SightTrack uses Mapbox for interactive mapping. While Mapbox
										does not set tracking cookies directly through our
										application, their services may involve the use of browser
										storage for rendering map features. You can read
										Mapbox&apos;s privacy practices here:
									</p>
									<p className="mb-4">
										<a
											href="https://www.mapbox.com/legal/privacy"
											className="text-white underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											Mapbox Privacy Policy
										</a>
									</p>
									<p className="mb-6">
										We also use AWS (Amazon Web Services) for cloud-based
										infrastructure and storage, which may involve secure session
										handling or server-side logging, but not browser cookies.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										5. Your Cookie Choices
									</h2>
									<p className="mb-4">
										You can control or disable cookies through your browser
										settings. Most browsers allow you to:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>Delete all cookies</li>
										<li>Block all cookies</li>
										<li>Allow cookies only from selected websites</li>
										<li>Notify you when a cookie is being set</li>
									</ul>
									<p className="mb-4">
										Please note that disabling essential cookies may impair your
										ability to use certain parts of the site (such as login
										functionality).
									</p>
									<p className="mb-4">For specific instructions:</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>
											<a
												href="https://support.google.com/chrome/answer/95647"
												className="text-white underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												Chrome
											</a>
										</li>
										<li>
											<a
												href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
												className="text-white underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												Firefox
											</a>
										</li>
										<li>
											<a
												href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
												className="text-white underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												Safari
											</a>
										</li>
									</ul>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										6. International Users & Legal Compliance
									</h2>
									<p className="mb-4">
										SightTrack may be accessed globally, including by users in:
									</p>
									<ul className="list-disc pl-6 mb-6 space-y-2">
										<li>Canada (PIPEDA compliance)</li>
										<li>United States (including California, under CCPA)</li>
										<li>European Union/UK (GDPR readiness)</li>
										<li>China (limited data use and no behavioral tracking)</li>
									</ul>
									<p className="mb-6">
										While our cookie use is minimal and privacy-focused, we
										encourage users from any region to contact us if they have
										concerns about data usage or want to exercise their rights
										under applicable data protection laws.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										7. Updates to This Policy
									</h2>
									<p className="mb-6">
										We may update this Cookie Policy periodically to reflect
										changes in our technologies or legal requirements. When we
										do, we will revise the &quot;Effective Date&quot; at the top
										of the policy and may notify users if significant changes
										are made.
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
