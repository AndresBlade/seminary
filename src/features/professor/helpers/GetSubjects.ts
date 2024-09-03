import { Subjects } from '../interfaces/CreateAssessmentsInterfaces';

export const GetSubjects = (): Promise<Subjects[]> => {
	return fetch(`${import.meta.env.VITE_URL}/subject/inst`).then(
		response => response.json() as Promise<Subjects[]>
	);
};
