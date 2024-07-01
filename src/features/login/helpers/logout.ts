export const logout = (token: string) => {
	return fetch('http://127.0.0.1:3000/user/logout', {
		method: 'POST',
		headers: { auth: token },
	});
};
