interface DividerProps {
	className?: string;
	orientation?: "horizontal" | "vertical";
}

export default function Divider({
	className = "",
	orientation = "horizontal",
}: DividerProps) {
	return (
		<div
			className={`${
				orientation === "horizontal"
					? "w-full h-[0.4px] mt-4"
					: "h-full w-[0.4px] mx-4"
			} bg-gray-400 ${className}`}
			role="separator"
			aria-orientation={orientation}
		/>
	);
}
