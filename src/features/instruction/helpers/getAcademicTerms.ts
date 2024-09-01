import { AcademicTerm } from '../interfaces/AcademicTerm';

export const getAcademicTerms = (token: string): Promise<AcademicTerm[]> =>
	fetch('https://wh1372200.ispot.cc/academicterm', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<AcademicTerm[]>);
