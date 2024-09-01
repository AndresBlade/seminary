async function CreateParish({
	dioceseId,
	name,
	parishPriest,
}: {
	dioceseId: number;
	name: string;
	parishPriest: string;
}): Promise<Response> {
	const response = await fetch('https://wh1372200.ispot.cc/parish/', {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			diocese_id: dioceseId,
			name: name,
			patron: parishPriest,
		}),
	});
	console.log(response);

	return response;
}
export { CreateParish };
