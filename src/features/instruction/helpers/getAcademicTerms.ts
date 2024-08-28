import { AcademicTerm } from '../interfaces/AcademicTerm';

export const getAcademicTerms = (token: string): Promise<AcademicTerm[]> =>
	fetch('http://127.0.0.1:3000/academicterm', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<AcademicTerm[]>);
