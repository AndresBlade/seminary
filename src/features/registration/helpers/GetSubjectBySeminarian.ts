import { SubjectsSeminarian } from '../interfaces/interfaces';
export const GetSubjectBySeminarian = ({
	id,
}: {
	id: string;
	token: string;
}): Promise<SubjectsSeminarian> => {
	return fetch(
		`https://wh1372200.ispot.cc/enrollment/academic-status/${id}`
	).then(response => response.json() as Promise<SubjectsSeminarian>);
};
