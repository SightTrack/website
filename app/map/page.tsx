"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchAllSightings } from "../../lib/fetchSightings";

// Lazy-load WorldMap
const WorldMap = dynamic(
	() =>
		import("../components/WorldMap").then((mod) => ({
			default: mod.WorldMap,
		})),
	{
		loading: () => (
			<div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-mono">
				<div className="w-full h-full bg-gray-800/20 rounded-lg animate-pulse flex items-center justify-center">
					<div className="text-white/60 text-lg">Loading map...</div>
				</div>
			</div>
		),
		ssr: false,
	},
);

export default function MapPage() {
	const [dots, setDots] = useState<Array<{ lat: number; lng: number }>>([]);

	useEffect(() => {
		async function loadSightings() {
			const all = await fetchAllSightings();
			const pts = all.filter((s) => s.latitude != null && s.longitude != null);

			// Convert to simple points for pulsing dots
			const points = pts.map((s) => ({
				lat: s.latitude,
				lng: s.longitude,
			}));

			setDots(points);
		}
		loadSightings();
	}, []);

	return (
		<div className="min-h-screen p-8 md:p-16 lg:p-24">
			<div className="max-w-7xl mx-auto">
				<WorldMap dots={dots} />
			</div>

			<div className="mt-8 text-center">
				<p className="text-gray-600 text-sm">
					Real time sightings from users around the world
				</p>
			</div>
		</div>
	);
}
