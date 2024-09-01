export const generateSeminarianDocument = (id: string, token: string) =>
	fetch(`http://127.0.0.1:3000/seminarian/ficha/${id}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	});
