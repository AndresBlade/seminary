import { TestsSubject } from '../interfaces/CreateAssessmentsInterfaces';

export const GetTestsSubject = ({
	id,
	academic_term_id,
}: {
	id: number;
	academic_term_id: number;
}): Promise<TestsSubject[]> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/test/?subject_id=${id}&academic_term_id=${academic_term_id}`
	).then(response => response.json() as Promise<TestsSubject[]>);
};
