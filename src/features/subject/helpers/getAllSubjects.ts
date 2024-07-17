import { SubjectFromDB } from '../interfaces/SubjectFromDB';

export const getAllSubjects = (token: string): Promise<SubjectFromDB[]> =>
	fetch('http://127.0.0.1:3000/subject', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<SubjectFromDB[]>);
