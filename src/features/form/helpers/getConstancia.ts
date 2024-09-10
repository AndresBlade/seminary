export const getConstancia = (id: string, token: string) =>
	fetch(`${import.meta.env.VITE_URL}/seminarian/constance/${id}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
