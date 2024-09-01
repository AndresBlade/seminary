export const generateSeminarianDocument = (id: string, token: string) =>
	fetch(`https://wh1372200.ispot.cc/seminarian/ficha/${id}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	});
