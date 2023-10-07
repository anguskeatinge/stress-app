// copilot instructions:
// - I want a page that has a bunch of inputs for the following information

// Category | Specifics | Impact Description | Points | Notes
// Sleep | < 4 hours | Very bad for immune system | -6 | Risk of viral infections increases
// Sleep | 4-6 hours | Bad for immune system | -4 | Reduced T-cell production
// Sleep | 7-9 hours | Good for immune system | +3 | Ideal for most adults
// Sleep | > 9 hours | Potentially negative | -1 | Oversleeping may indicate other health issues
// Exercise | Overtraining | Weakens immune system | -5 | Increases cortisol
// Exercise | Moderate cardio (20-40 min) | Boosts immune system | +3 | Improves circulation of immune cells
// Exercise | Light cardio | Mildly boosts immune system | +2 | Walking, leisure cycling
// Exercise | Heavy strength training | Moderate impact on immunity | +1 | Avoid if feeling unwell
// Exercise | HIIT | Can stress immune system | -2 | High cortisol response
// Diet | High sugar & processed | Bad for immune system | -4 | Causes inflammation
// Diet | Balanced & nutritious | Good for immune system | +4 | Variety of nutrients
// Diet | Low protein | Bad for immune system | -3 | Protein needed for immune cell production
// Intermittent Fasting | Short-term (14-16 hrs) | Potentially positive | +2 | May improve cell autophagy
// Intermittent Fasting | Long-term (>20 hrs) | Mixed results | 0 | Research not conclusive
// Alcohol | Excessive consumption | Weakens immune system | -5 | Impairs white blood cell function
// Alcohol | Moderate consumption | Minimal impact | 0 | Aim for moderation
// Smoking | Any amount | Very bad for immune system | -6 | Causes inflammation, impairs immune response
// Hydration | Dehydration | Bad for immune system | -3 | Reduces lymph fluid

"use client";
import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import classNames from "classnames";
import { categories } from "@/lib/constants";
import laggy from "@/lib/laggy";

// const getFetcher =
// 	(method: "GET" | "POST" | "PUT" | "DELETE") =>
// 	async (input: RequestInfo, init?: RequestInit): Promise<any> => {
// 		const res = await fetch(input, {
// 			method,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			...init,
// 		});
// 		return res.json() as Promise<any>;
// 	};
const getFetcher =
	(method: "GET" | "POST" | "PUT" | "DELETE") =>
	async (
		[input, body]: [RequestInfo, any],
		init?: RequestInit,
	): Promise<any> => {
		let queryParams = "";
		if (method === "GET") {
			const params = new URLSearchParams();
			for (const [key, value] of Object.entries(body)) {
				params.append(key, String(value));
			}
			queryParams = params.toString();
		}

		const res = await fetch(`${input}${queryParams ? `?${queryParams}` : ""}`, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			...(method === "POST" ? { body: JSON.stringify(body) } : {}),
			...init,
		});
		return res.json() as Promise<any>;
	};

const ResultCircle: React.FC<{ score: number }> = ({ score }) => {
	let color: string;
	const big = Math.abs(score) > 5;
	if (score > 2) {
		color = big
			? classNames(
					"from-green-500",
					"to-green-600",
					"hover:from-green-600",
					"hover:to-green-700",
			  )
			: classNames(
					"from-green-500/60",
					"to-green-600/60",
					"hover:from-green-600/60",
					"hover:to-green-700/60",
			  );
	} else if (score < -2) {
		color = big
			? classNames(
					"from-red-500",
					"to-red-600",
					"hover:from-red-600",
					"hover:to-red-700",
			  )
			: classNames(
					"from-red-500/60",
					"to-red-600/60",
					"hover:from-red-600/60",
					"hover:to-red-700/60",
			  );
	} else {
		color = classNames(
			"from-yellow-500/80",
			"to-yellow-600/80",
			"hover:from-yellow-600/80",
			"hover:to-yellow-700/80",
		);
	}

	return (
		<div
			className={classNames(
				"rounded-full",
				"ease-out",
				"transition-all",
				"shadow-lg",
				"bg-gradient-to-r",
				"transform hover:scale-105",
				color,
				big ? "w-24 h-24" : "w-16 h-16",
				big ? "duration-600" : "duration-300",
			)}
		>
			<div className="text-center flex items-center justify-center h-full text-white font-bold text-lg">
				{score}
			</div>
		</div>
	);
};

type TypingAnimationProps = {
	status: "weapon" | "good" | "decent" | "middle" | "bad" | "worse" | "dead";
};

const messageObject = {
	weapon: "You are an absolute fucking weapon.",
	good: "Solid effort!",
	decent: "You're doing okay.",
	middle: "You'll live.",
	bad: "You need help.",
	worse: "You're fucked mate.",
	dead: "I'll call the morgue while you finish off that ciggy.",
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ status }) => {
	const [text, setText] = useState<string>("");

	useEffect(() => {
		let index = 0;
		setText("");
		const timer = setInterval(() => {
			const nextLetter = messageObject[status][index];
			if (nextLetter) {
				setText((prevText) => prevText + nextLetter);
				index += 1;
			} else {
				clearInterval(timer);
			}
		}, 50);

		return () => clearInterval(timer);
	}, [status]);

	return (
		<div className="text-xl font-semibold h-[30px]">
			<span>{text}</span>
			<span className="animate-blink cursor inline-block w-1.5 h-[1em] ml-1">
				|
			</span>
		</div>
	);
};

const ClickAway: React.FC<{
	children: React.ReactNode;
	onClickAway: () => void;
}> = ({ children, onClickAway }) => {
	const ref = useRef<any>();

	useEffect(() => {
		function handleOutsideClick(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickAway();
			}
		}

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onClickAway]);

	return <div ref={ref}>{children}</div>;
};

const HealthComponent: React.FC = () => {
	const [openField, setOpenField] = useState("");
	const [formData, setFormData] = useState<any>({});
	const { data, error } = useSWR(
		["/checkHealth", formData],
		getFetcher("POST"),
		{ use: [laggy] },
	);

	const handleSelect = (key: string, value: string) => {
		setFormData({
			...formData,
			[key]: value,
		});
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-lg rounded mb-5">
				<h1 className="text-white text-5xl font-extrabold">
					Ultimate Health Tracker
				</h1>
				<p className="text-white text-lg mt-2">
					Monitor and improve your daily habits.
				</p>
			</div>
			<div className="p-4 ">
				<div className="space-y-4">
					{categories.map(({ id, label, options, description }) => (
						<div
							className="flex flex-col md:flex-row items-center justify-between mb-2 "
							key={id}
						>
							<label
								htmlFor={id}
								className="text-lg font-semibold md:mb-0 md:mr-2 w-full md:w-auto min-w-[250px]"
							>
								{label}
							</label>

							<div
								className="relative bg-white dark:bg-slate-800 border rounded w-full md:w-[280px] cursor-pointer mt-2 md:mt-0"
								onClick={() => {
									setOpenField(openField === id ? "" : id);
								}}
							>
								<ClickAway
									onClickAway={() => {
										if (openField === id) setOpenField("");
									}}
								>
									<div className="p-2 pl-4 pr-8 hover:bg-blue-100 dark:hover:bg-blue-900 ">
										{formData[id] || description || "Select an option"}
									</div>

									<div
										className="absolute w-full border border-t-0 rounded-b z-10 bg-white dark:bg-slate-800"
										style={{ display: openField !== id ? "none" : undefined }}
									>
										<div
											className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 p-2 pl-4"
											onClick={() => handleSelect(id, "")}
										>
											<div className="inline-block align-middle">
												Not Applicable
											</div>
										</div>
										{options.map((option, index) => (
											<div
												className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 p-2 pl-4"
												key={index}
												onClick={() => handleSelect(id, option.text)}
											>
												<div className="align-middle">{option.text}</div>
												<div className="text-gray-400 text-sm align-middle py-1">
													{option.description}
												</div>
												<div className="text-gray-400 text-sm align-middle">
													{option.notes}
												</div>
											</div>
										))}
									</div>
								</ClickAway>
							</div>
						</div>
					))}
				</div>

				{error && (
					<p className="mt-4 text-red-600 font-semibold">
						Error: {error.message}
					</p>
				)}
				{typeof data?.sleepScore === "number" && (
					<div className="mt-4 flex flex-col items-center justify-center">
						<div className="flex items-center justify-center h-32">
							<ResultCircle score={data.sleepScore} />
						</div>
						<TypingAnimation
							status={
								data.sleepScore < -20
									? "dead"
									: data.sleepScore < -8
									? "worse"
									: data.sleepScore < -3
									? "bad"
									: data.sleepScore < 3
									? "middle"
									: data.sleepScore < 6
									? "decent"
									: data.sleepScore > 10
									? "weapon"
									: "good"
							}
						/>
					</div>
				)}
			</div>
		</main>
	);
};

export default HealthComponent;
