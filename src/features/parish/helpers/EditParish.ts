async function EditParish({
	id,
	diocesesId,
	name,
	parishPriest,
	token
}: {
	id: number;
	diocesesId: number;
	name: string;
	parishPriest: string;
	token:string
}): Promise<Response> {
	const response = await fetch(
		`${import.meta.env.VITE_URL}/parish/${id.toString()}`,
		{
			method: 'PUT',
			mode: 'cors', // no-cors, *cors, same-origin
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				auth:token
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
