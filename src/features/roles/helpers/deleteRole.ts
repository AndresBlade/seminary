export const deleteRole = (id: number) => {
	return fetch(`${import.meta.env.VITE_URL}/role/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
