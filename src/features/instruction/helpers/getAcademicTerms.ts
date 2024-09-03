import { AcademicTerm } from '../interfaces/AcademicTerm';

export const getAcademicTerms = (token: string): Promise<AcademicTerm[]> =>
	fetch(`${import.meta.env.VITE_URL}/academicterm`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<AcademicTerm[]>);
