// lib/fetchSightings.js

interface Sighting {
	[key: string]: unknown;
}

// Fetch a single "page" of sightings
export async function fetchSightings({
	limit = 50,
	nextToken,
}: { limit?: number; nextToken?: string } = {}) {
	// Add nextToken to query params if provided
	const url = new URL(
		"https://j9zxawncta.execute-api.us-east-1.amazonaws.com/dev/sightings",
	);
	url.searchParams.set("limit", limit.toString());
	if (nextToken) url.searchParams.set("nextToken", nextToken);

	const res = await fetch(url.toString(), { cache: "no-store" });

	if (!res.ok) {
		throw new Error(`Failed to fetch sightings: ${res.status}`);
	}

	return res.json(); // { items: [...], nextToken: "..." }
}

// Fetch *all* sightings by iterating through all pages
export async function fetchAllSightings() {
	let allSightings: Sighting[] = [];
	let nextToken: string | undefined = undefined;

	do {
		const data = await fetchSightings({ limit: 100, nextToken });
		allSightings = [...allSightings, ...data.items];
		nextToken = data.nextToken; // continue until null
	} while (nextToken);

	return allSightings;
}
