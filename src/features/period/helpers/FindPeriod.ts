import { GetPeriod } from '../interfaces/Period';

export const FindPeriod = ({
	date,
	token
}: {
	date: string;
	token:string
}): Promise<GetPeriod[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/AcademicTerm/?fecha=${date}`
	,{
		headers:{
			auth:token
		}
	}).then(response => response.json() as Promise<GetPeriod[]>);
};
