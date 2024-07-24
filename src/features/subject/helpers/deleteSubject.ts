export const deleteSubject = (id: number, token: string) => {
	return fetch(`http://127.0.0.1:3000/subject/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
	});
};
