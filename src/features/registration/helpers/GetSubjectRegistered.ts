import { SubjectsRegistered } from '../interfaces/interfaces';

export const GetSubjectRegistered = (
	id: string
): Promise<SubjectsRegistered[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/?seminarian_id=${id}`
	).then(response => response.json() as Promise<SubjectsRegistered[]>);
};
