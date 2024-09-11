export const getPensum = (token: string) => {
	return fetch(`${import.meta.env.VITE_URL}/subject/pensum`, {
		headers: { auth: token },
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};
