export const deleteRole = (id: number) => {
	return fetch(`https://wh1372200.ispot.cc/role/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
