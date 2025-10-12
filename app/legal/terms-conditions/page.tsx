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

export default function TermsConditionsPage() {
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
								Terms & Conditions
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
										These terms and conditions apply to the SightTrack app
										(hereby referred to as &quot;Application&quot;) for mobile
										devices that was created by SightTrack (hereby referred to
										as &quot;Service Provider&quot;) as a Free service.
									</p>
								</motion.div>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Acceptance of Terms
									</h2>
									<p className="mb-6">
										Upon downloading or utilizing the Application, you are
										automatically agreeing to the following terms. It is
										strongly advised that you thoroughly read and understand
										these terms prior to using the Application. Unauthorized
										copying, modification of the Application, any part of the
										Application, or our trademarks is strictly prohibited. Any
										attempts to extract the source code of the Application,
										translate the Application into other languages, or create
										derivative versions are not permitted. All trademarks,
										copyrights, database rights, and other intellectual property
										rights related to the Application remain the property of the
										Service Provider.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Service Modifications
									</h2>
									<p className="mb-6">
										The Service Provider is dedicated to ensuring that the
										Application is as beneficial and efficient as possible. As
										such, they reserve the right to modify the Application or
										charge for their services at any time and for any reason.
										The Service Provider assures you that any charges for the
										Application or its services will be clearly communicated to
										you.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Data Storage and Device Security
									</h2>
									<p className="mb-6">
										The Application stores and processes personal data that you
										have provided to the Service Provider in order to provide
										the Service. It is your responsibility to maintain the
										security of your phone and access to the Application. The
										Service Provider strongly advise against jailbreaking or
										rooting your phone, which involves removing software
										restrictions and limitations imposed by the official
										operating system of your device. Such actions could expose
										your phone to malware, viruses, malicious programs,
										compromise your phone&apos;s security features, and may
										result in the Application not functioning correctly or at
										all.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Internet Connectivity
									</h2>
									<p className="mb-6">
										Please be aware that the Service Provider does not assume
										responsibility for certain aspects. Some functions of the
										Application require an active internet connection, which can
										be Wi-Fi or provided by your mobile network provider. The
										Service Provider cannot be held responsible if the
										Application does not function at full capacity due to lack
										of access to Wi-Fi or if you have exhausted your data
										allowance.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Data Usage and Charges
									</h2>
									<p className="mb-6">
										If you are using the application outside of a Wi-Fi area,
										please be aware that your mobile network provider&apos;s
										agreement terms still apply. Consequently, you may incur
										charges from your mobile provider for data usage during the
										connection to the application, or other third-party charges.
										By using the application, you accept responsibility for any
										such charges, including roaming data charges if you use the
										application outside of your home territory (i.e., region or
										country) without disabling data roaming. If you are not the
										bill payer for the device on which you are using the
										application, they assume that you have obtained permission
										from the bill payer.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										User Responsibilities
									</h2>
									<p className="mb-6">
										Similarly, the Service Provider cannot always assume
										responsibility for your usage of the application. For
										instance, it is your responsibility to ensure that your
										device remains charged. If your device runs out of battery
										and you are unable to access the Service, the Service
										Provider cannot be held responsible.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Limitation of Liability
									</h2>
									<p className="mb-6">
										In terms of the Service Provider&apos;s responsibility for
										your use of the application, it is important to note that
										while they strive to ensure that it is updated and accurate
										at all times, they do rely on third parties to provide
										information to them so that they can make it available to
										you. The Service Provider accepts no liability for any loss,
										direct or indirect, that you experience as a result of
										relying entirely on this functionality of the application.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Application Updates and Termination
									</h2>
									<p className="mb-4">
										The Service Provider may wish to update the application at
										some point. The application is currently available as per
										the requirements for the operating system (and for any
										additional systems they decide to extend the availability of
										the application to) may change, and you will need to
										download the updates if you want to continue using the
										application. The Service Provider does not guarantee that it
										will always update the application so that it is relevant to
										you and/or compatible with the particular operating system
										version installed on your device. However, you agree to
										always accept updates to the application when offered to
										you.
									</p>
									<p className="mb-6">
										The Service Provider may also wish to cease providing the
										application and may terminate its use at any time without
										providing termination notice to you. Unless they inform you
										otherwise, upon any termination, (a) the rights and licenses
										granted to you in these terms will end; (b) you must cease
										using the application, and (if necessary) delete it from
										your device.
									</p>
								</motion.section>

								<motion.section variants={staggerItem}>
									<h2 className="text-2xl font-semibold mb-4 text-white">
										Changes to These Terms and Conditions
									</h2>
									<p className="mb-6">
										The Service Provider may periodically update their Terms and
										Conditions. Therefore, you are advised to review this page
										regularly for any changes. The Service Provider will notify
										you of any changes by posting the new Terms and Conditions
										on this page.
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
