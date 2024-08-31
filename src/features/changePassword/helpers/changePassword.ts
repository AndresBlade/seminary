export const changePassword = (id: string, password: string, token: string) =>
	fetch('http://127.0.0.1:3000/user/pass/', {
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
