async function CreateDiocesis({
	name,
	obispo,
	token,
}: {
	name: string;
	obispo: string;
	token: string;
}): Promise<Response> {
	const response = await fetch('http://127.0.0.1:3000/Diocese/', {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			name: name,
			holder: obispo,
		}),
	});
	console.log(response);

	return response;
}
export { CreateDiocesis };
