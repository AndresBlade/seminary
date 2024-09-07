import { Data } from '../interfaces/CreateAssessmentsInterfaces';

export const GetSeminarianListTestScore = ({
	subject_id,
	academic_term_id,
	token
}: {
	subject_id: number;
	academic_term_id: number;
	token:string
}): Promise<Data> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/test/for-test-score/?subject_id=${subject_id}&academic_term_id=${academic_term_id}`
	,{
		headers:{
			auth:token
		}
	}).then(response => response.json() as Promise<Data>);
};
