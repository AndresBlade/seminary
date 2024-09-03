export async function DeleteSubjectsRegistered({
	id,
	token,
}: {
	id: number;
	token: string;
}) {
	return await fetch(`${import.meta.env.VITE_URL}/enrollment/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-type': 'application/json',
			auth: token,
		},
	});
}
