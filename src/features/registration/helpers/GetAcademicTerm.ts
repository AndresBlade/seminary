import { AcademicTerm } from '../interfaces/interfaces';
export const GetAcademicTerm = (): Promise<AcademicTerm[]> => {
	return fetch(`https://wh1372200.ispot.cc/AcademicTerm`).then(
		response => response.json() as Promise<AcademicTerm[]>
	);
};
