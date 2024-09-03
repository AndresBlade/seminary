export const generateSeminarianDocument = (id: string, token: string) =>
	fetch(`${import.meta.env.VITE_URL}/seminarian/ficha/${id}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	});
