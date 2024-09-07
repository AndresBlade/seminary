import { Subjects } from '../interfaces/CreateAssessmentsInterfaces';

export const GetSubjects = (token:string): Promise<Subjects[]> => {
	return fetch(`${import.meta.env.VITE_URL}/subject/inst`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<Subjects[]>
	);
};
