import { Role } from '../interfaces/Role';

export const editRole = ({
	id,
	name,
	description,
	numbers,
	token,
}: {
	id: number;
	name: string;
	description: string;
	numbers: number[];
	token: string;
}): Promise<Role[]> => {
	console.log({ id, name, description, numbers, token });
	return fetch(`${import.meta.env.VITE_URL}/role`, {
		method: 'PUT',
		body: JSON.stringify({ id, name, description, numbers, token }),
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
			// Otros encabezados personalizados si es necesario
		},
	}).then(response => response.json() as Promise<Role[]>);
};
