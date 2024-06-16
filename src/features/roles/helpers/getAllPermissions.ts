import { Permission } from '../interfaces/Permission';

export const getAllPermissions = (): Promise<Permission[]> =>
	fetch('http://127.0.0.1:3000/role/permi').then(
		response => response.json() as Promise<Permission[]>
	);
