import { SubjectsRegistered } from '../interfaces/interfaces';

export const GetSubjectRegistered = (
	id: string
): Promise<SubjectsRegistered[]> => {
	return fetch(
		`https://wh1372200.ispot.cc/enrollment/?seminarian_id=${id}`
	).then(response => response.json() as Promise<SubjectsRegistered[]>);
};
