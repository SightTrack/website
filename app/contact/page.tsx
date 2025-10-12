"use client";

import { useState } from "react";
import { Mail, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
	general?: string;
}

export default function ContactPage() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [submitMessage, setSubmitMessage] = useState("");

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Name validation
		if (!formData.name.trim()) {
			newErrors.name = "Full name is required";
		} else if (formData.name.trim().length < 2) {
			newErrors.name = "Name must be at least 2 characters";
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email address is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Subject validation
		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		} else if (formData.subject.trim().length < 3) {
			newErrors.subject = "Subject must be at least 3 characters";
		}

		// Message validation
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		} else if (formData.message.length > 2000) {
			newErrors.message = "Message must be less than 2000 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isSubmitting) return;

		// Validate form
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus("idle");
		setErrors({}); // Clear any previous errors

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				// Handle different error types
				if (response.status === 429) {
					setErrors({
						general:
							data.error ||
							"Too many submissions. Please wait before sending another message.",
					});
				} else {
					setErrors({
						general:
							data.error ||
							"Message could not be sent. Please try again later.",
					});
				}
				setSubmitStatus("error");
				return;
			}

			// Success
			setSubmitStatus("success");
			setSubmitMessage(
				data.message ||
					"Message sent successfully! We'll get back to you within 24 hours.",
			);

			// Reset form
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.error("Error sending message:", error);
			setSubmitStatus("error");
			setErrors({
				general: "Network error. Please check your connection and try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const remainingChars = 2000 - formData.message.length;

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
		<div className="min-h-screen bg-black text-white font-mono">
			<motion.div
				className="max-w-6xl mx-auto px-16 py-16 min-h-auto"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={staggerContainer}
			>
				{/* Contact Grid */}
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
					variants={staggerContainer}
				>
					{/* Contact Form */}
					<motion.div
						className="bg-white/[0.03] border border-white/10 rounded-xl p-8"
						variants={fadeInLeft}
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.h2
							className="text-2xl font-medium text-white mb-6 tracking-tight"
							variants={staggerItem}
						>
							Send us a Message
						</motion.h2>

						{/* Success Message */}
						{submitStatus === "success" && (
							<motion.div
								className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 text-green-400 text-center"
								initial={{ opacity: 0, scale: 0.9, y: -20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<strong>Message sent successfully!</strong> We&apos;ll get back
								to you within 24 hours.
							</motion.div>
						)}

						{/* Error Message */}
						{submitStatus === "error" && (
							<motion.div
								className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-400 text-center"
								initial={{ opacity: 0, scale: 0.9, y: -20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<strong>Error:</strong> {submitMessage}
							</motion.div>
						)}

						{/* General Error */}
						{errors.general && (
							<motion.div
								className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-400 text-center"
								initial={{ opacity: 0, scale: 0.9, y: -20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								{errors.general}
							</motion.div>
						)}

						<motion.form
							onSubmit={handleSubmit}
							className="space-y-6"
							variants={staggerContainer}
						>
							{/* Name Field */}
							<motion.div variants={staggerItem}>
								<motion.label
									htmlFor="name"
									className="block text-white mb-2 font-normal"
									variants={staggerItem}
								>
									Full Name
								</motion.label>
								<motion.input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-white/20 placeholder-gray-500"
									placeholder="Enter your full name"
									whileFocus={{
										scale: 1.02,
										borderColor: "rgba(255,255,255,0.3)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								/>
								{errors.name && (
									<motion.div
										className="text-red-400 text-sm mt-2"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{errors.name}
									</motion.div>
								)}
							</motion.div>

							{/* Email Field */}
							<motion.div variants={staggerItem}>
								<motion.label
									htmlFor="email"
									className="block text-white mb-2 font-normal"
									variants={staggerItem}
								>
									Email Address
								</motion.label>
								<motion.input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-white/20 placeholder-gray-500"
									placeholder="Enter your email address"
									whileFocus={{
										scale: 1.02,
										borderColor: "rgba(255,255,255,0.3)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								/>
								{errors.email && (
									<motion.div
										className="text-red-400 text-sm mt-2"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{errors.email}
									</motion.div>
								)}
							</motion.div>

							{/* Subject Field */}
							<motion.div variants={staggerItem}>
								<motion.label
									htmlFor="subject"
									className="block text-white mb-2 font-normal"
									variants={staggerItem}
								>
									Subject
								</motion.label>
								<motion.input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-white/20 placeholder-gray-500"
									placeholder="Enter the subject"
									whileFocus={{
										scale: 1.02,
										borderColor: "rgba(255,255,255,0.3)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								/>
								{errors.subject && (
									<motion.div
										className="text-red-400 text-sm mt-2"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{errors.subject}
									</motion.div>
								)}
							</motion.div>

							{/* Message Field */}
							<motion.div variants={staggerItem}>
								<motion.label
									htmlFor="message"
									className="block text-white mb-2 font-normal"
									variants={staggerItem}
								>
									Message
								</motion.label>
								<motion.textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									rows={5}
									className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-white/20 placeholder-gray-500 resize-vertical min-h-[120px]"
									placeholder="Enter your message"
									whileFocus={{
										scale: 1.02,
										borderColor: "rgba(255,255,255,0.3)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								/>
								<motion.div
									className={`text-sm text-right mt-2 ${
										remainingChars < 100 ? "text-red-400" : "text-gray-500"
									}`}
									variants={staggerItem}
								>
									{remainingChars} characters remaining
								</motion.div>
								{errors.message && (
									<motion.div
										className="text-red-400 text-sm mt-2"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{errors.message}
									</motion.div>
								)}
							</motion.div>

							{/* Submit Button */}
							<motion.button
								type="submit"
								disabled={isSubmitting}
								className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
								variants={staggerItem}
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</motion.button>
						</motion.form>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						className="bg-white/[0.03] border border-white/10 rounded-xl p-8"
						variants={fadeInRight}
						whileHover={{ scale: 1.02, y: -5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.h2
							className="text-2xl font-medium text-white mb-6 tracking-tight"
							variants={staggerItem}
						>
							Get in Touch
						</motion.h2>

						<motion.div className="space-y-6" variants={staggerContainer}>
							{/* Email */}
							<motion.div
								className="flex items-center p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<motion.div
									className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
								</motion.div>
								<div>
									<h3 className="text-xl font-medium text-white mb-2">Email</h3>
									<p className="text-gray-300">
										<a
											href="mailto:contact@sighttrack.org"
											className="text-white hover:text-gray-300 transition-colors duration-300"
										>
											contact@sighttrack.org
										</a>
									</p>
								</div>
							</motion.div>

							{/* Address */}
							<motion.div
								className="flex items-center p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<motion.div
									className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
								</motion.div>
								<div>
									<h3 className="text-xl font-medium text-white mb-2">
										Address
									</h3>
									<p className="text-gray-300">Toronto, ON, Canada</p>
								</div>
							</motion.div>

							{/* Instagram */}
							<motion.div
								className="flex items-center p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<motion.div
									className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
								</motion.div>
								<div>
									<h3 className="text-xl font-medium text-white mb-2">
										Instagram
									</h3>
									<p className="text-gray-300">
										<a
											href="https://www.instagram.com/sighttrack/"
											target="_blank"
											rel="noopener noreferrer"
											className="text-white hover:text-gray-300 transition-colors duration-300"
										>
											@sighttrack
										</a>
									</p>
								</div>
							</motion.div>

							{/* TikTok */}
							<motion.div
								className="flex items-center p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
								variants={staggerItem}
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<motion.div
									className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<svg
										className="w-6 h-6 text-white"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
									</svg>
								</motion.div>
								<div>
									<h3 className="text-xl font-medium text-white mb-2">
										TikTok
									</h3>
									<p className="text-gray-300">
										<a
											href="https://www.tiktok.com/@sighttrack"
											target="_blank"
											rel="noopener noreferrer"
											className="text-white hover:text-gray-300 transition-colors duration-300"
										>
											@sighttrack
										</a>
									</p>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
