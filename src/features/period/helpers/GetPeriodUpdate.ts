import { GetPeriod } from '../interfaces/Period';

export const GetPeriodUpdate = ({ id,token }: { id: number,token:string }): Promise<GetPeriod> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm/${id}`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<GetPeriod>
	);
};
