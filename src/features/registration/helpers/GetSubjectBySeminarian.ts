import { SubjectsSeminarian } from '../interfaces/interfaces';
export const GetSubjectBySeminarian = ({
	id,
}: {
	id: string;
	token: string;
}): Promise<SubjectsSeminarian> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/academic-status/${id}`
	).then(response => response.json() as Promise<SubjectsSeminarian>);
};
