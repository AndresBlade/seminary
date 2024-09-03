export const logout = (token: string) => {
	return fetch(`${import.meta.env.VITE_URL}/user/logout`, {
		method: 'POST',
		headers: { auth: token },
	});
};
