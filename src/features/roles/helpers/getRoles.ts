import { Role } from '../interfaces/Role';

export const getRoles = (): Promise<Role[]> => {
	return fetch(`http://127.0.0.1:3000/role/search`).then(
		response => response.json() as Promise<Role[]>
	);
};
