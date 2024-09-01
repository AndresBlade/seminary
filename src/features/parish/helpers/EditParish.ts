async function EditParish({
	id,
	diocesesId,
	name,
	parishPriest,
}: {
	id: number;
	diocesesId: number;
	name: string;
	parishPriest: string;
}): Promise<Response> {
	const response = await fetch(
		`https://wh1372200.ispot.cc/parish/${id.toString()}`,
		{
			method: 'PUT',
			mode: 'cors', // no-cors, *cors, same-origin
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				diocese_id: diocesesId,
				name: name,
				patron: parishPriest,
			}),
		}
	);
	console.log(response);

	return response;
}
export { EditParish };
