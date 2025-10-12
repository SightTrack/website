import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [],
	},
	experimental: {
		optimizePackageImports: ["motion", "dotted-map"],
	},
	async redirects() {
		return [
			{
				source: "/legal",
				destination: "/legal/privacy-policy",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
