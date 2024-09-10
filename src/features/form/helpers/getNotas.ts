export const getNotas = (token: string, id: string) => {
	return fetch(`${import.meta.env.VITE_URL}/test/notas/${id}`, {
		headers: { auth: token },
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};
