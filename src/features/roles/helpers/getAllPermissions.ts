import { Permission } from '../interfaces/Permission';
export const getAllPermissions = async (token: string): Promise<Permission[]> =>
	fetch('https://wh1372200.ispot.cc/role/permi', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Permission[]>);
