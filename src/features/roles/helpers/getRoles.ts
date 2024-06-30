import { Role } from '../interfaces/Role';
export const getRoles = (token: string): Promise<Role[]> =>
	fetch(`http://127.0.0.1:3000/role/search`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Role[]>);
