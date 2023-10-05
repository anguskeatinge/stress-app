import { categories } from "@/lib/constants";

export async function POST(request: Request) {
	let sum = 0;
	const body = await request.json();
	Object.entries(body).forEach(([key, val]) => {
		const num = categories
			.find((a) => a.id === key)
			?.options.find((b) => b.text === val)?.value;

		sum += num ? Number(num) : 0;
	});
	return Response.json({
		sleepScore: sum,
	});
}
