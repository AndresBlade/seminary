export const deleteSubject = (id: number, token: string) => {
	return fetch(`https://wh1372200.ispot.cc/subject/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
	});
};
