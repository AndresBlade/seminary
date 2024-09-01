import { Role } from '../interfaces/Role';
export const getRoles = (token: string): Promise<Role[]> =>
	fetch(`https://wh1372200.ispot.cc/role/search`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Role[]>);
