interface DeleteUserProps {
	id: string;
	token: string;
	url: string;
}

export async function DeleteUser({ id, token, url }: DeleteUserProps) {
	await fetch(`https://wh1372200.ispot.cc/${url}/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			auth: token,
			'Content-Type': 'application/json',
		},
	});
}
