import { Role } from '../interfaces/Role';
import { RolesWrapper } from '../interfaces/RolesWrapper';
export const getRoles = async (token: string): Promise<RolesWrapper> => {
	const response = await fetch(`http://127.0.0.1:3000/role/search`, {
		headers: {
			auth: token,
		},
	});

	const roles = (await response.json()) as Role[];
	const newToken = response.headers.get('auth')!;

	console.log(newToken);

	console.log(roles);

	return { roles, token: newToken };
};
