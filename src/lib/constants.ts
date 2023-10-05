export const categories = [
	{
		id: "sleep",
		label: "Sleep:",
		description: "How long do you sleep?",
		options: [
			{
				value: "-6",
				text: "< 4 hours per night",
				description: "Very bad for immune system",
				notes: "Risk of viral infections increases",
			},
			{
				value: "-4",
				text: "4-6 hours per night",
				description: "Bad for immune system",
				notes: "Reduced T-cell production",
			},
			{
				value: "3",
				text: "7-9 hours per night",
				description: "Good for immune system",
				notes: "Ideal for most adults",
			},
			{
				value: "-1",
				text: "> 9 hours per night",
				description: "Potentially negative",
				notes: "Oversleeping may indicate other health issues",
			},
		],
	},
	{
		id: "exercise",
		label: "Exercise:",
		options: [
			{
				value: "-5",
				text: "Overtraining",
				description: "Weakens immune system",
				notes: "Increases cortisol",
			},
			{
				value: "3",
				text: "Moderate cardio",
				description: "Boosts immune system",
				notes: "Improves circulation of immune cells",
			},
			{
				value: "2",
				text: "Light cardio",
				description: "Mildly boosts immune system",
				notes: "Walking, leisure cycling",
			},
			{
				value: "1",
				text: "Heavy strength training",
				description: "Moderate impact on immunity",
				notes: "Avoid if feeling unwell",
			},
			{
				value: "-2",
				text: "HIIT",
				description: "Can stress immune system",
				notes: "High cortisol response",
			},
		],
	},
	{
		id: "diet",
		label: "Diet:",
		options: [
			{
				value: "-4",
				text: "High sugar & processed",
				description: "Bad for immune system",
				notes: "Causes inflammation",
			},
			{
				value: "4",
				text: "Balanced & nutritious",
				description: "Good for immune system",
				notes: "Variety of nutrients",
			},
			{
				value: "-3",
				text: "Low protein",
				description: "Bad for immune system",
				notes: "Protein needed for immune cell production",
			},
		],
	},
	{
		id: "intermittentFasting",
		label: "Intermittent Fasting:",
		options: [
			{
				value: "2",
				text: "Short-term (14-16 hrs)",
				description: "Potentially positive",
				notes: "May improve cell autophagy",
			},
			{
				value: "0",
				text: "Long-term (>20 hrs)",
				description: "Mixed results",
				notes: "Research not conclusive",
			},
		],
	},
	{
		id: "alcohol",
		label: "Alcohol:",
		options: [
			{
				value: "-5",
				text: "Excessive consumption",
				description: "Weakens immune system",
				notes: "Impairs white blood cell function",
			},
			{
				value: "0",
				text: "Moderate consumption",
				description: "Minimal impact",
				notes: "Aim for moderation",
			},
		],
	},
	{
		id: "smoking",
		label: "Smoking:",
		options: [
			{
				value: "-6",
				text: "Any amount",
				description: "Very bad for immune system",
				notes: "Causes inflammation, impairs immune response",
			},
		],
	},
	{
		id: "hydration",
		label: "Hydration:",
		options: [
			{
				value: "-3",
				text: "Dehydration",
				description: "Bad for immune system",
				notes: "Reduces lymph fluid",
			},
		],
	},
];
