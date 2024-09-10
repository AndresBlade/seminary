export const getCartaCulminacion = (id: string, token: string) =>
	fetch(`${import.meta.env.VITE_URL}/seminarian/carcaCulmin/${id}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
