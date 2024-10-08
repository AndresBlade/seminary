export const changePassword = (id: string, password: string, token: string) =>
	fetch(`${import.meta.env.VITE_URL}/user/pass/`, {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			id,
			password,
		}),
	});
