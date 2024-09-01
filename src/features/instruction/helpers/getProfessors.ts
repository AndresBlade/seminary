import { Professor } from '../interfaces/Professor';

export const getProfessors = (token: string): Promise<Professor[]> =>
	fetch('https://wh1372200.ispot.cc/user/user-by-type?type=professor', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Professor[]>);
