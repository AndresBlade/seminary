export const getCardFromUser = (
	token: string,
	id: string,
	type: 'seminarian' | 'instructor' | 'professor'
) => {
	return fetch(`${import.meta.env.VITE_URL}/${type}/ficha/${id}`, {
		headers: { auth: token },
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};
