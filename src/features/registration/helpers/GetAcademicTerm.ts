import { AcademicTerm } from '../interfaces/interfaces';
export const GetAcademicTerm = (token:string): Promise<AcademicTerm[]> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<AcademicTerm[]>
	);
};
