import { Professor } from '../interfaces/Professor';

export const getProfessors = (token: string): Promise<Professor[]> =>
	fetch(`${import.meta.env.VITE_URL}/user/user-by-type?type=professor`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Professor[]>);
