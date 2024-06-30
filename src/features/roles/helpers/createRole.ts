async function createRole({
	name,
	description,
	numbers,
	token,
}: {
	name: string;
	description: string;
	numbers: number[];
	token: string;
}): Promise<void> {
	const response = await fetch('http://127.0.0.1:3000/role/', {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			name: name,
			description: description,
			numbers: numbers,
		}),
	}).then((response: Response) => {
		console.log(response);
		if (!response.ok) {
			alert(response.statusText);
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}
	});
	console.log(response);

	return response;
}
export { createRole };
