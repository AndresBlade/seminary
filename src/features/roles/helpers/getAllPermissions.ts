import { Permission } from '../interfaces/Permission';
export const getAllPermissions = async (token: string): Promise<Permission[]> =>
	fetch(`${import.meta.env.VITE_URL}/role/permi`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Permission[]>);
