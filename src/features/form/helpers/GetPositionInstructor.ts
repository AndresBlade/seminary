import { positionInstructor } from '../interfaces/Form';

export const GetPositionInstructor = (token: string) => {
	return fetch(`${import.meta.env.VITE_URL}/extras/instructors`, {
		headers: {
			auth: token,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error('error al listar el cargo de los formadores');
		}
		return response.json() as Promise<positionInstructor>;
	});
};
