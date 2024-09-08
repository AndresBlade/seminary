import { SubjectsRegistered } from '../interfaces/interfaces';

export const GetSubjectRegistered = (
	{id,token}:{id:string,token:string}
): Promise<SubjectsRegistered[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/?seminarian_id=${id}`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<SubjectsRegistered[]>);
};
