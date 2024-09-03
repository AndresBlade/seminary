import { Data } from '../interfaces/CreateAssessmentsInterfaces';

export const GetSeminarianListTestScore = ({
	subject_id,
	academic_term_id,
}: {
	subject_id: number;
	academic_term_id: number;
}): Promise<Data> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/test/for-test-score/?subject_id=${subject_id}&academic_term_id=${academic_term_id}`
	).then(response => response.json() as Promise<Data>);
};
