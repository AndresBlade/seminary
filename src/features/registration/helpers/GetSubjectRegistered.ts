import { SubjectsRegistered } from '../interfaces/interfaces';

export const GetSubjectRegistered = (
	{id,token, academicTerm}:{id:string,token:string,academicTerm:number}
): Promise<SubjectsRegistered[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/?seminarian_id=${id}&academic_term_id=${academicTerm}`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<SubjectsRegistered[]>);
};
