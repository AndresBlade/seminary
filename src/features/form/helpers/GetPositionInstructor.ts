import { positionInstructor } from '../interfaces/Form';

export const GetPositionInstructor = (token: string) => {
	return fetch(`https://wh1372200.ispot.cc/extras/instructors`, {
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
