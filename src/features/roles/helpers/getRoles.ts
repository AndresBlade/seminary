import { Role } from '../interfaces/Role';
export const getRoles = (token: string): Promise<Role[]> =>
	fetch(`${import.meta.env.VITE_URL}/role/search`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Role[]>);
