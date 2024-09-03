import { SubjectFromDB } from '../interfaces/SubjectFromDB';

export const getAllSubjects = (token: string): Promise<SubjectFromDB[]> =>
	fetch(`${import.meta.env.VITE_URL}/subject`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<SubjectFromDB[]>);
