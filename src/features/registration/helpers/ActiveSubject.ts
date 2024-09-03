export async function ActiveSubject({
	id,
	token,
}: {
	id: number;
	token: string;
}) {
	return await fetch(`${import.meta.env.VITE_URL}/enrollment/${id}`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			status: 'CURSANDO',
		}),
	});
}
