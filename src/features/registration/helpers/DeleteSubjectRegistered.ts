export async function DeleteSubjectsRegistered({
	id,
	token,
}: {
	id: number;
	token: string;
}) {
	return await fetch(`https://wh1372200.ispot.cc/enrollment/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-type': 'application/json',
			auth: token,
		},
	});
}
