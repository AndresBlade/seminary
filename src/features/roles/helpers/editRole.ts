import { Role } from '../interfaces/Role';

export const editRole = ({
	id,
	name,
	description,
	numbers,
}: {
	id: number;
	name: string;
	description: string;
	numbers: number[];
}): Promise<Role[]> => {
	console.log({ id, name, description, numbers });
	return fetch(`http://127.0.0.1:3000/role`, {
		method: 'PUT',
		body: JSON.stringify({ id, name, description, numbers }),
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			// Otros encabezados personalizados si es necesario
		},
	}).then(response => response.json() as Promise<Role[]>);
};
