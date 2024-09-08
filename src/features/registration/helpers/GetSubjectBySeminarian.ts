import { SubjectsSeminarian } from '../interfaces/interfaces';
export const GetSubjectBySeminarian = ({
	id,
	token
}: {
	id: string;
	token: string;
}): Promise<SubjectsSeminarian> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/academic-status/${id}`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<SubjectsSeminarian>);
};
