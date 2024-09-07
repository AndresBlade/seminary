import { GetPeriod } from '../interfaces/Period';

export const GetPeriods = (token:string): Promise<GetPeriod[]> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm/`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<GetPeriod[]>
	);
};
