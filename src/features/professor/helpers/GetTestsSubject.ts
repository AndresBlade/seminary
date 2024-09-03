import { TestsSubject } from '../interfaces/CreateAssessmentsInterfaces';

export const GetTestsSubject = ({
	id,
}: {
	id: number;
}): Promise<TestsSubject[]> => {
	return fetch(`${import.meta.env.VITE_URL}/test/?subject_id=${id}`).then(
		response => response.json() as Promise<TestsSubject[]>
	);
};
