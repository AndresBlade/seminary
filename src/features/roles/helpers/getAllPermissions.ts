import { Permission } from '../interfaces/Permission';

export const getAllPermissions = (token:string): Promise<Permission[]> =>
	fetch('http://127.0.0.1:3000/role/permi',{
		headers:{
			Authorization:'Bearer ' + token
		}
	}).then(
		response => response.json() as Promise<Permission[]>
	);
