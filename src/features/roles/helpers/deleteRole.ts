export const deleteRole = (id: number) => {
	return fetch(`http://127.0.0.1:3000/role/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
