"use client";

import { useRef, useMemo, memo, useState } from "react";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
	dots?: Array<{
		lat: number;
		lng: number;
		label?: string;
	}>;
}

export const WorldMap = memo(function WorldMap({ dots = [] }: MapProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [hoveredCluster, setHoveredCluster] = useState<{
		index: number;
		count: number;
		x: number;
		y: number;
	} | null>(null);

	// Memoize the map and SVG generation to prevent recreation on every render
	const svgMap = useMemo(() => {
		const map = new DottedMap({ height: 100, grid: "diagonal" });
		return map.getSVG({
			radius: 0.22,
			color: "#FFFFFF",
			shape: "circle",
			backgroundColor: "transparent",
		});
	}, []); // Empty dependency array since map config never changes

	const projectPoint = (lat: number, lng: number) => {
		const x = (lng + 180) * (800 / 360);
		const y = (90 - lat) * (400 / 180);
		return { x, y };
	};

	// Clustering algorithm to group nearby dots for performance
	const clusteredDots = useMemo(() => {
		if (dots.length === 0) return [];

		const clusterDistance = 15; // pixels
		const clusters: Array<{
			center: { x: number; y: number };
			count: number;
			isCluster: boolean;
			originalDots: Array<{ lat: number; lng: number; label?: string }>;
		}> = [];

		const processedPoints = dots.map((dot) => ({
			...dot,
			point: projectPoint(dot.lat, dot.lng),
			clustered: false,
		}));

		for (let i = 0; i < processedPoints.length; i++) {
			if (processedPoints[i].clustered) continue;

			const currentPoint = processedPoints[i];
			const nearbyPoints = [currentPoint];
			processedPoints[i].clustered = true;

			// Find nearby points to cluster
			for (let j = i + 1; j < processedPoints.length; j++) {
				if (processedPoints[j].clustered) continue;

				const distance = Math.sqrt(
					Math.pow(currentPoint.point.x - processedPoints[j].point.x, 2) +
						Math.pow(currentPoint.point.y - processedPoints[j].point.y, 2),
				);

				if (distance < clusterDistance) {
					nearbyPoints.push(processedPoints[j]);
					processedPoints[j].clustered = true;
				}
			}

			// Calculate cluster center
			const centerX =
				nearbyPoints.reduce((sum, p) => sum + p.point.x, 0) /
				nearbyPoints.length;
			const centerY =
				nearbyPoints.reduce((sum, p) => sum + p.point.y, 0) /
				nearbyPoints.length;

			clusters.push({
				center: { x: centerX, y: centerY },
				count: nearbyPoints.length,
				isCluster: nearbyPoints.length > 1,
				originalDots: nearbyPoints.map((p) => ({
					lat: p.lat,
					lng: p.lng,
					label: p.label,
				})),
			});
		}

		return clusters;
	}, [dots]);

	return (
		<div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-mono">
			<Image
				src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
				className="h-full w-full pointer-events-none select-none"
				alt="world map"
				height="495"
				width="1056"
				draggable={false}
			/>
			<svg
				ref={svgRef}
				viewBox="0 0 800 400"
				className="w-full h-full absolute inset-0 select-none"
			>
				{clusteredDots.map((cluster, index) => {
					// Always use blue color for all dots, treating them as clusters
					const color = "#87CEEB"; // Light blue for all dots
					const radius = Math.min(3 + cluster.count * 0.5, 8);
					const pulseRadius = Math.min(8 + cluster.count * 0.8, 16);

					return (
						<g
							key={`cluster-${index}`}
							onMouseEnter={() => {
								const rect = svgRef.current?.getBoundingClientRect();
								if (rect) {
									const svgX = cluster.center.x;
									const svgY = cluster.center.y;
									// Convert SVG coordinates to screen coordinates
									const screenX = (svgX / 800) * rect.width + rect.left;
									const screenY = (svgY / 400) * rect.height + rect.top;

									setHoveredCluster({
										index,
										count: cluster.count,
										x: screenX,
										y: screenY,
									});
								}
							}}
							onMouseLeave={() => setHoveredCluster(null)}
							style={{ cursor: "pointer" }}
						>
							{/* Base circle */}
							<circle
								cx={cluster.center.x}
								cy={cluster.center.y}
								r={radius}
								fill={color}
							/>

							{/* Pulse animation - reduced frequency for performance */}
							<circle
								cx={cluster.center.x}
								cy={cluster.center.y}
								r={radius}
								fill={color}
								opacity="0.4"
							>
								<animate
									attributeName="r"
									from={radius}
									to={pulseRadius}
									dur="3s"
									begin={`${index * 0.5}s`}
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									from="0.4"
									to="0"
									dur="3s"
									begin={`${index * 0.5}s`}
									repeatCount="indefinite"
								/>
							</circle>

							{/* Cluster count text for all dots */}
							<text
								x={cluster.center.x}
								y={cluster.center.y}
								textAnchor="middle"
								dominantBaseline="central"
								fontSize="8"
								fill="white"
								fontWeight="bold"
							>
								{cluster.count}
							</text>
						</g>
					);
				})}
			</svg>

			{/* Vercel-inspired Tooltip */}
			{hoveredCluster && (
				<div
					className="fixed z-50 pointer-events-none"
					style={{
						left: hoveredCluster.x,
						top: hoveredCluster.y - 45, // Position above the cluster
						transform: "translateX(-50%)", // Center horizontally
					}}
				>
					<div className="bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-800 whitespace-nowrap font-mono">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
							<span>
								This area has {hoveredCluster.count} sighting
								{hoveredCluster.count !== 1 ? "s" : ""}
							</span>
						</div>
						{/* Tooltip arrow */}
						<div className="absolute left-1/2 top-full w-0 h-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
					</div>
				</div>
			)}
		</div>
	);
});
