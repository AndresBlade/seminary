import { SubjectFromDB } from '../interfaces/SubjectFromDB';

export const getAllSubjects = (token: string): Promise<SubjectFromDB[]> =>
	fetch('https://wh1372200.ispot.cc/subject', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<SubjectFromDB[]>);
