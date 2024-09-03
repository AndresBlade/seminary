import { AcademicTerm } from '../interfaces/interfaces';
export const GetAcademicTerm = (): Promise<AcademicTerm[]> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm`).then(
		response => response.json() as Promise<AcademicTerm[]>
	);
};
