function LoginUser({ id, password }: { id: string; password: string }) {
	return fetch('https://wh1372200.ispot.cc/user/login/', {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: id,
			password: password,
		}),
	}).then(response => {
		console.log(response.headers.get('auth'));
		return response;
	});
}
export { LoginUser };
