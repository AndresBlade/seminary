export const logout = (token: string) => {
	return fetch('https://wh1372200.ispot.cc/user/logout', {
		method: 'POST',
		headers: { auth: token },
	});
};
