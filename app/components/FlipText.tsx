"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
	words,
	duration = 3000,
	className,
}: {
	words: string[];
	duration?: number;
	className?: string;
}) => {
	const [currentWord, setCurrentWord] = useState(words[0]);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const startAnimation = useCallback(() => {
		const word = words[words.indexOf(currentWord) + 1] || words[0];
		setCurrentWord(word);
		setIsAnimating(true);
	}, [currentWord, words]);

	useEffect(() => {
		if (!isAnimating) {
			const timer = setTimeout(() => {
				startAnimation();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [isAnimating, duration, startAnimation]);

	return (
		<AnimatePresence
			mode="wait"
			onExitComplete={() => {
				setIsAnimating(false);
			}}
		>
			<motion.span
				initial={{
					opacity: 0,
					y: 10,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
				exit={{
					opacity: 0,
					y: -20,
					position: "absolute",
				}}
				className={cn(
					"inline-block relative text-left text-neutral-900 dark:text-neutral-100",
					className,
				)}
				key={currentWord}
			>
				{currentWord}
			</motion.span>
		</AnimatePresence>
	);
};
