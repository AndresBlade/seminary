export const deleteSubject = (id: number, token: string) => {
	return fetch(`${import.meta.env.VITE_URL}/subject/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
	});
};
