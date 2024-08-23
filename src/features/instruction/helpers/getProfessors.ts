import { Professor } from '../interfaces/Professor';

export const getProfessors = (token: string): Promise<Professor[]> =>
	fetch('http://127.0.0.1:3000/user/user-by-type?type=professor', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Professor[]>);
