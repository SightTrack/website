import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting storage (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Spam detection function
function detectSpam(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): { isSpam: boolean; reason?: string } {
	const message = data.message.toLowerCase();
	const spamKeywords = [
		"viagra",
		"casino",
		"lottery",
		"bitcoin",
		"cryptocurrency",
		"seo",
		"backlinks",
	];

	// Check for spam keywords
	for (const keyword of spamKeywords) {
		if (message.includes(keyword)) {
			return { isSpam: true, reason: `Contains spam keyword: ${keyword}` };
		}
	}

	// Check for excessive URLs
	const urlRegex = /https?:\/\/[^\s]+/g;
	const urls = message.match(urlRegex) || [];
	if (urls.length > 2) {
		return { isSpam: true, reason: "Too many URLs" };
	}

	// Check for suspicious patterns
	if (message.length < 10) {
		return { isSpam: true, reason: "Message too short" };
	}

	return { isSpam: false };
}

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
	const now = Date.now();
	const windowMs = 60 * 60 * 1000; // 1 hour
	const maxRequests = 3;

	const record = rateLimitMap.get(ip);

	if (!record || now > record.resetTime) {
		// Reset or create new record
		rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
		return { allowed: true, remaining: maxRequests - 1 };
	}

	if (record.count >= maxRequests) {
		return { allowed: false, remaining: 0 };
	}

	record.count++;
	return { allowed: true, remaining: maxRequests - record.count };
}

// Get client IP address
function getClientIP(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const realIP = request.headers.get("x-real-ip");

	if (forwarded) {
		return forwarded.split(",")[0].trim();
	}

	if (realIP) {
		return realIP;
	}

	return "unknown";
}

export async function POST(request: NextRequest) {
	try {
		// Get client IP for rate limiting
		const clientIP = getClientIP(request);

		// Check rate limit
		const rateLimit = checkRateLimit(clientIP);
		if (!rateLimit.allowed) {
			return NextResponse.json(
				{
					error:
						"Too many submissions. Please wait before sending another message.",
					rateLimited: true,
				},
				{ status: 429 },
			);
		}

		// Parse request body
		const body = await request.json();
		const { name, email, subject, message } = body;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 },
			);
		}

		// Check for spam
		const spamCheck = detectSpam({ name, email, subject, message });
		if (spamCheck.isSpam) {
			console.log(`Spam detected from ${email}: ${spamCheck.reason}`);
			// Don't tell the user it's spam, just show generic error
			return NextResponse.json(
				{ error: "Message could not be sent. Please try again later." },
				{ status: 400 },
			);
		}

		// Log the submission (similar to your Django version)
		console.log("=== CONTACT FORM SUBMISSION ===");
		console.log(`IP: ${clientIP}`);
		console.log(`Name: ${name}`);
		console.log(`Email: ${email}`);
		console.log(`Subject: ${subject}`);
		console.log(`Message: ${message}`);
		console.log("Spam Check: Passed");
		console.log("================================");

		// Configure email transporter
		// You'll need to set these environment variables
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "smtp.gmail.com",
			port: parseInt(process.env.SMTP_PORT || "587"),
			secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// Email content
		const emailSubject = `SightTrack Contact Form: ${subject}`;
		const emailMessage = `
New contact form submission from SightTrack website:

IP Address: ${clientIP}
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the SightTrack contact form.
Reply directly to ${email} to respond to the sender.

Security Info:
- Passed spam detection
- Rate limit: ${3 - rateLimit.remaining}/3 submissions this hour
		`.trim();

		// Send email
		await transporter.sendMail({
			from: process.env.SMTP_FROM || process.env.SMTP_USER,
			to: process.env.CONTACT_EMAIL || "contact@sighttrack.org",
			subject: emailSubject,
			text: emailMessage,
			replyTo: email, // Allow direct replies to the sender
		});

		console.log("Email sent successfully!");

		return NextResponse.json(
			{
				success: true,
				message:
					"Message sent successfully! We'll get back to you within 24 hours.",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error sending email:", error);

		return NextResponse.json(
			{ error: "Message could not be sent. Please try again later." },
			{ status: 500 },
		);
	}
}

// Handle unsupported methods
export async function GET() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
